import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createAIFeedback = mutation({
    args: {
        interviewId: v.string(),
        totalScore: v.number(),
        categoryScores: v.array(
            v.object({
                name: v.string(),
                score: v.number(),
                comment: v.string(),
            })
        ),
        strengths: v.array(v.string()),
        areasForImprovement: v.array(v.string()),
        finalAssessment: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db.insert("feedbacks", {
            ...args,
        });
    },
});

export const getFeedbackByInterviewId = query({
    args: { interviewId: v.string() },

    handler: async (ctx, args) => {
        return await ctx.db
        .query("feedbacks")
        .withIndex("by_interview_id", (q) => q.eq("interviewId", args.interviewId))
        .first();
    },
});