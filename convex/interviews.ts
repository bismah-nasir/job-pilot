import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {
    getCurrentUser,
    isPendingInterviewer,
    requireInterviewer,
} from "./authHelpers";

export const getAllInterviews = query({
    handler: async (ctx) => {
        const currentUser = await getCurrentUser(ctx);

        // Only interviewers can see every interview
        if (currentUser?.role !== "interviewer") return [];

        const interviews = await ctx.db.query("interviews").collect();

        return interviews;
    },
});

export const getMyInterviews = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) return [];

        if (isPendingInterviewer(await getCurrentUser(ctx))) return [];

        const interviews = await ctx.db
        .query("interviews")
        .withIndex("by_candidate_id", (q) => q.eq("candidateId", identity.subject))
        .collect();

        return interviews;
    },
});

export const getInterviewByStreamCallId = query({
    args: { streamCallId: v.string() },

    handler: async (ctx, args) => {
        const currentUser = await getCurrentUser(ctx);

        if (!currentUser) return null;

        const interview = await ctx.db
        .query("interviews")
        .withIndex("by_stream_call_id", (q) => q.eq("streamCallId", args.streamCallId))
        .first();

        if (!interview) return null;

        const isParticipant =
            interview.candidateId === currentUser.clerkId ||
            interview.interviewerIds.includes(currentUser.clerkId);

        if (!isParticipant && currentUser.role !== "interviewer") return null;

        return interview;
    },
});

export const createInterview = mutation({
    args: {
        title: v.string(),
        description: v.optional(v.string()),
        startTime: v.number(),
        status: v.string(),
        streamCallId: v.string(),
        candidateId: v.string(),
        interviewerIds: v.array(v.string()),
    },

    handler: async (ctx, args) => {
        await requireInterviewer(ctx);

        return await ctx.db.insert("interviews", {
        ...args,
        });
    },
});

export const updateInterviewStatus = mutation({
    args: {
        id: v.id("interviews"),
        status: v.union(
            v.literal("upcoming"),
            v.literal("completed"),
            v.literal("succeeded"),
            v.literal("failed")
        ),
    },

    handler: async (ctx, args) => {
        await requireInterviewer(ctx);

        return await ctx.db.patch(args.id, {
            status: args.status,
            ...(args.status === "completed" ? { endTime: Date.now() } : {}),
        });
    },
});
