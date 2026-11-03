import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import {
    getCurrentUser,
    isPendingInterviewer,
    requireActiveUser,
} from "./authHelpers";

// Returns the AI interview if it belongs to the signed-in user, otherwise null.
const getOwnedAIInterview = async (ctx: QueryCtx, interviewId: string) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return null;

    if (isPendingInterviewer(await getCurrentUser(ctx))) return null;

    const id = ctx.db.normalizeId("aiInterviews", interviewId);

    if (!id) return null;

    const interview = await ctx.db.get(id);

    if (!interview || interview.candidateId !== identity.subject) return null;

    return interview;
};

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
        await requireActiveUser(ctx);

        const interview = await getOwnedAIInterview(ctx, args.interviewId);

        if (!interview) throw new Error("Interview not found");

        return await ctx.db.insert("feedbacks", {
            ...args,
        });
    },
});

export const getFeedbackByInterviewId = query({
    args: { interviewId: v.string() },

    handler: async (ctx, args) => {
        const interview = await getOwnedAIInterview(ctx, args.interviewId);

        if (!interview) return null;

        return await ctx.db
            .query("feedbacks")
            .withIndex("by_interview_id", (q) =>
                q.eq("interviewId", args.interviewId)
            )
            .order("desc")
            .first();
    },
});
