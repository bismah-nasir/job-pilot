"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { getConvexToken } from "@/lib/convexAuth";

export const streamTokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error("User not authenticated");

    // Interviewers awaiting approval get no platform access — that includes video calls
    const token = await getConvexToken();
    const me = token ? await fetchQuery(api.users.getMe, {}, { token }) : null;

    if (me?.role === "candidate" && me.interviewerRequest === "pending") {
        throw new Error("Your interviewer account is awaiting approval");
    }

    const streamClient = new StreamClient(
        process.env.NEXT_PUBLIC_STREAM_API_KEY!,
        process.env.STREAM_SECRET_KEY!
    );

    return streamClient.generateUserToken({ user_id: user.id });
};
