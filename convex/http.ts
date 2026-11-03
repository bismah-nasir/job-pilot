import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

        if (!webhookSecret) {
            throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
        }

        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if(!svix_id || !svix_signature || !svix_timestamp) {
            return new Response("No svix headers found", {
                status: 400,
            });
        }

        // Svix signs the exact raw bytes — re-serializing parsed JSON can break verification
        const body = await request.text();

        const wh = new Webhook(webhookSecret);
        let evt: WebhookEvent;

        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as WebhookEvent;

        } catch (error) {
            console.error("Error verifying webhook:", error);
            return new Response("Error occurred", {status: 400});
        }

        try {
            switch (evt.type) {
                case "user.created":
                case "user.updated": {
                    const {
                        id,
                        email_addresses,
                        primary_email_address_id,
                        first_name,
                        last_name,
                        image_url,
                    } = evt.data;

                    const email = (
                        email_addresses.find(
                            (e) => e.id === primary_email_address_id
                        ) ?? email_addresses[0]
                    )?.email_address;

                    if (!email) {
                        return new Response("User has no email address", { status: 400 });
                    }

                    const name = `${first_name || ""} ${last_name || ""}`.trim();
                    const user = { clerkId: id, email, name, image: image_url };

                    if (evt.type === "user.created") {
                        await ctx.runMutation(internal.users.syncUser, user);
                    } else {
                        await ctx.runMutation(internal.users.updateUser, user);
                    }
                    break;
                }

                case "user.deleted": {
                    if (evt.data.id) {
                        await ctx.runMutation(internal.users.deleteUser, {
                            clerkId: evt.data.id,
                        });
                    }
                    break;
                }
            }
        } catch (error) {
            console.error(`Error handling ${evt.type}:`, error);
            return new Response("Error processing webhook", { status: 500 });
        }

        return new Response("Webhook processed successfully", { status: 200 });
    }),
});

export default http;
