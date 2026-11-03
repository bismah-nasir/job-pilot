import { Doc } from "./_generated/dataModel";
import { QueryCtx } from "./_generated/server";

// Returns the signed-in user's Convex record, or null if not signed in / not synced yet.
export const getCurrentUser = async (ctx: QueryCtx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return null;

    return await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
        .first();
};

// Asked to be an interviewer and not approved yet — gets no access to the platform.
export const isPendingInterviewer = (user: Doc<"users"> | null) =>
    user?.role === "candidate" && user.interviewerRequest === "pending";

export const isInterviewer = async (ctx: QueryCtx) => {
    const user = await getCurrentUser(ctx);
    return user?.role === "interviewer";
};

export const requireIdentity = async (ctx: QueryCtx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    return identity;
};

// Signed in and not waiting for interviewer approval.
export const requireActiveUser = async (ctx: QueryCtx) => {
    const identity = await requireIdentity(ctx);
    const user = await getCurrentUser(ctx);

    if (isPendingInterviewer(user)) {
        throw new Error("Your interviewer account is awaiting approval");
    }

    return identity;
};

export const requireInterviewer = async (ctx: QueryCtx) => {
    const user = await getCurrentUser(ctx);

    if (!user) throw new Error("Unauthorized");
    if (user.role !== "interviewer") throw new Error("Forbidden");

    return user;
};
