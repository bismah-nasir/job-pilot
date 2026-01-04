import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createAIInterview = mutation({
    args: {
        role: v.string(),
        type: v.string(),
        level: v.string(),
        techstack: v.array(v.string()),
        questions: v.array(v.string()),
        candidateId: v.string(),
        coverImage: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db.insert("aiInterviews", {
            ...args,
        });
    },
});

export const getMyAIInterviews = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return [];

        const aiInterviews = await ctx.db
            .query("aiInterviews")
            .withIndex("by_candidate_id", (q) =>
                q.eq("candidateId", identity.subject)
            )
            .collect();

        return aiInterviews!;
    },
});

export const getAIInterviewById = query({
    args: { id: v.id("aiInterviews") },

    handler: async (ctx, args) => {
        const interview = await ctx.db.get(args.id);
        return interview; // Returns the document or null if not found
    },
});
