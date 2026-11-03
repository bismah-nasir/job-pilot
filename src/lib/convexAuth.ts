import "server-only";
import { auth } from "@clerk/nextjs/server";

// Clerk JWT (template "convex") for calling Convex as the signed-in user from the server.
// Returns null when nobody is signed in.
export const getConvexToken = async () => {
    const { userId, getToken } = await auth();

    if (!userId) return null;

    return (await getToken({ template: "convex" })) ?? null;
};
