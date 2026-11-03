import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { getCurrentUser } from "./authHelpers";

// Internal: only callable from the Clerk webhook (convex/http.ts), not from clients.
export const syncUser = internalMutation({
    args: {
        name: v.string(),
        email: v.string(),
        clerkId: v.string(),
        image: v.optional(v.string()),
    },

    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        // If exsist then do nothing simply return from this function
        if (existingUser) return;

        // Everyone starts as a candidate; interviewers are approved manually
        return await ctx.db.insert("users", {
            ...args,
            role: "candidate",
        });
    },
});

// Internal: keeps name/email/image in sync when the user edits their Clerk profile.
export const updateUser = internalMutation({
    args: {
        clerkId: v.string(),
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
    },

    handler: async (ctx, { clerkId, ...fields }) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
            .first();

        if (!user) return;

        await ctx.db.patch(user._id, fields);
    },
});

// Internal: removes the user record when the account is deleted in Clerk.
export const deleteUser = internalMutation({
    args: { clerkId: v.string() },

    handler: async (ctx, { clerkId }) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
            .first();

        if (user) await ctx.db.delete(user._id);
    },
});

// The signed-in user's own record (null if signed out or not synced yet).
export const getMe = query({
    handler: async (ctx) => {
        return await getCurrentUser(ctx);
    },
});

// "Sign in as Interviewer": only ever marks the request as pending.
// Approval happens manually in the Convex dashboard (set role to "interviewer").
export const requestInterviewerAccess = mutation({
    handler: async (ctx) => {
        const user = await getCurrentUser(ctx);

        if (!user) throw new Error("Your account is still being set up. Please try again in a moment.");

        if (user.role === "interviewer") return;

        await ctx.db.patch(user._id, { interviewerRequest: "pending" });
    },
});

// Lets someone who clicked the wrong button go back to being a candidate.
export const withdrawInterviewerRequest = mutation({
    handler: async (ctx) => {
        const user = await getCurrentUser(ctx);

        if (!user || user.role === "interviewer") return;

        await ctx.db.patch(user._id, { interviewerRequest: undefined });
    },
});

// Interviewers see everyone (needed for scheduling/dashboard); candidates only see themselves.
export const getUsers = query({
    handler: async (ctx) => {
        const currentUser = await getCurrentUser(ctx);

        if (!currentUser) return [];

        if (currentUser.role !== "interviewer") return [currentUser];

        return await ctx.db.query("users").collect();
    },
});

export const getUserByClerkId = query({
    args: { clerkId: v.string() },

    handler: async (ctx, args) => {
        const currentUser = await getCurrentUser(ctx);

        if (!currentUser) return null;

        // Users may look themselves up; interviewers may look anyone up.
        if (
            currentUser.clerkId !== args.clerkId &&
            currentUser.role !== "interviewer"
        ) {
            return null;
        }

        if (currentUser.clerkId === args.clerkId) return currentUser;

        return await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();
    },
});
