import { mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser, isPendingInterviewer } from "./authHelpers";

const MAX_CODE_LENGTH = 100_000;

const language = v.union(
    v.literal("javascript"),
    v.literal("python"),
    v.literal("java")
);

// Who may see/edit a call's code:
// - scheduled interviews: the candidate, the assigned interviewers, and any interviewer
// - instant meetings (no interview record): anyone signed in, same as joining the call itself
const canAccessCall = async (ctx: QueryCtx, streamCallId: string) => {
    const user = await getCurrentUser(ctx);

    if (!user || isPendingInterviewer(user)) return null;

    const interview = await ctx.db
        .query("interviews")
        .withIndex("by_stream_call_id", (q) => q.eq("streamCallId", streamCallId))
        .first();

    if (!interview) return user;

    const isParticipant =
        interview.candidateId === user.clerkId ||
        interview.interviewerIds.includes(user.clerkId);

    return isParticipant || user.role === "interviewer" ? user : null;
};

export const getCodeSession = query({
    args: { streamCallId: v.string() },

    handler: async (ctx, { streamCallId }) => {
        if (!(await canAccessCall(ctx, streamCallId))) return null;

        return await ctx.db
            .query("codeSessions")
            .withIndex("by_stream_call_id", (q) => q.eq("streamCallId", streamCallId))
            .first();
    },
});

export const updateCodeSession = mutation({
    args: {
        streamCallId: v.string(),
        questionId: v.string(),
        language,
        code: v.string(),
    },

    handler: async (ctx, args) => {
        const user = await canAccessCall(ctx, args.streamCallId);

        if (!user) throw new Error("Unauthorized");

        if (args.code.length > MAX_CODE_LENGTH) {
            throw new Error("Code is too long");
        }

        const existing = await ctx.db
            .query("codeSessions")
            .withIndex("by_stream_call_id", (q) =>
                q.eq("streamCallId", args.streamCallId)
            )
            .first();

        const fields = {
            questionId: args.questionId,
            language: args.language,
            code: args.code,
            updatedBy: user.clerkId,
        };

        if (existing) {
            await ctx.db.patch(existing._id, fields);
        } else {
            await ctx.db.insert("codeSessions", {
                streamCallId: args.streamCallId,
                ...fields,
            });
        }
    },
});
