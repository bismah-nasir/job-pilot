import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
    getCurrentUser,
    isPendingInterviewer,
    requireActiveUser,
} from "./authHelpers";

// candidateId always comes from the signed-in user's token, never from the client.
export const createAIInterview = mutation({
    args: {
        role: v.string(),
        type: v.string(),
        level: v.string(),
        techstack: v.array(v.string()),
        questions: v.array(v.string()),
        coverImage: v.string(),
    },

    handler: async (ctx, args) => {
        const identity = await requireActiveUser(ctx);

        return await ctx.db.insert("aiInterviews", {
            ...args,
            candidateId: identity.subject,
        });
    },
});

export const getMyAIInterviews = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return [];

        if (isPendingInterviewer(await getCurrentUser(ctx))) return [];

        const aiInterviews = await ctx.db
            .query("aiInterviews")
            .withIndex("by_candidate_id", (q) =>
                q.eq("candidateId", identity.subject)
            )
            // Newest first, so a just-created interview appears at the top
            .order("desc")
            .collect();

        return aiInterviews;
    },
});

// Accepts any string so a malformed URL id returns null instead of throwing.
export const getAIInterviewById = query({
    args: { id: v.string() },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return null;

        if (isPendingInterviewer(await getCurrentUser(ctx))) return null;

        const id = ctx.db.normalizeId("aiInterviews", args.id);

        if (!id) return null;

        const interview = await ctx.db.get(id);

        // Only the owner can see their AI interview
        if (!interview || interview.candidateId !== identity.subject) return null;

        return interview;
    },
});
