import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, requireInterviewer } from "./authHelpers";

// Add a new comment
export const addComment = mutation({
    args: {
        interviewId: v.id("interviews"),
        content: v.string(),
        rating: v.number(),
    },
    handler: async (ctx, args) => {
        const interviewer = await requireInterviewer(ctx);

        if (args.rating < 1 || args.rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }

        return await ctx.db.insert("comments", {
            interviewId: args.interviewId,
            content: args.content,
            rating: args.rating,
            interviewerId: interviewer.clerkId,
        });
    },
});

// Get all comments for an interview (interviewers only)
export const getComments = query({
    args: { interviewId: v.id("interviews") },

    handler: async (ctx, args) => {
        const currentUser = await getCurrentUser(ctx);

        if (currentUser?.role !== "interviewer") return [];

        const comments = await ctx.db
        .query("comments")
        .withIndex("by_interview_id", (q) => q.eq("interviewId", args.interviewId))
        .collect();

        return comments;
    },
});
