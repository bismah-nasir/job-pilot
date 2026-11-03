import { internalMutation, mutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { requireActiveUser } from "./authHelpers";

type AiKind = "interview" | "feedback";

const DAY_MS = 24 * 60 * 60 * 1000;

// Defaults — override per deployment in the Convex dashboard
// (Settings → Environment Variables) without changing code:
//   AI_INTERVIEWS_PER_DAY, AI_INTERVIEW_COOLDOWN_SECONDS,
//   AI_FEEDBACKS_PER_DAY,  AI_FEEDBACK_COOLDOWN_SECONDS
const envNumber = (name: string, fallback: number) => {
    const value = Number(process.env[name]);
    return Number.isFinite(value) && value >= 0 ? value : fallback;
};

const getLimits = (kind: AiKind) =>
    kind === "interview"
        ? {
              perDay: envNumber("AI_INTERVIEWS_PER_DAY", 10),
              cooldownMs: envNumber("AI_INTERVIEW_COOLDOWN_SECONDS", 120) * 1000,
              label: "AI interviews",
          }
        : {
              perDay: envNumber("AI_FEEDBACKS_PER_DAY", 20),
              cooldownMs: envNumber("AI_FEEDBACK_COOLDOWN_SECONDS", 60) * 1000,
              label: "AI feedbacks",
          };

const formatWait = (ms: number) => {
    const totalSeconds = Math.max(1, Math.ceil(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${hours} h ${minutes} min`;
    if (minutes > 0) return seconds > 0 ? `${minutes} min ${seconds} s` : `${minutes} min`;
    return `${seconds} s`;
};

const getUsage = async (ctx: QueryCtx, userId: string, kind: AiKind, now: number) => {
    const { perDay, cooldownMs, label } = getLimits(kind);

    // Requests in the last 24 hours, newest first
    const recent = await ctx.db
        .query("aiUsage")
        .withIndex("by_user_kind", (q) =>
            q.eq("userId", userId).eq("kind", kind).gt("_creationTime", now - DAY_MS)
        )
        .order("desc")
        .collect();

    const remaining = Math.max(0, perDay - recent.length);
    let waitMs = 0;
    let reason: string | null = null;

    if (recent.length >= perDay) {
        // Oldest request in the window decides when a slot frees up
        waitMs = recent[recent.length - 1]._creationTime + DAY_MS - now;
        reason = `You've reached today's limit of ${perDay} ${label}. Try again in ${formatWait(waitMs)}.`;
    } else if (recent.length > 0 && now - recent[0]._creationTime < cooldownMs) {
        waitMs = recent[0]._creationTime + cooldownMs - now;
        reason = `Please take your time with each one — you can request another in ${formatWait(waitMs)}.`;
    }

    return { remaining, perDay, waitMs, reason };
};

// Reserves one request BEFORE calling Gemini. Runs as a single transaction,
// so two quick clicks can't both get through.
export const consumeAiQuota = mutation({
    args: { kind: v.union(v.literal("interview"), v.literal("feedback")) },

    handler: async (ctx, { kind }) => {
        const identity = await requireActiveUser(ctx);
        const usage = await getUsage(ctx, identity.subject, kind, Date.now());

        if (usage.reason) {
            return { ok: false as const, message: usage.reason };
        }

        const usageId = await ctx.db.insert("aiUsage", {
            userId: identity.subject,
            kind,
        });

        return { ok: true as const, usageId };
    },
});

// Gives the slot back when the Gemini request failed (e.g. Google was overloaded),
// so users aren't penalised for errors that weren't theirs.
export const refundAiQuota = mutation({
    args: { usageId: v.id("aiUsage") },

    handler: async (ctx, { usageId }) => {
        const identity = await requireActiveUser(ctx);
        const usage = await ctx.db.get(usageId);

        if (usage && usage.userId === identity.subject) {
            await ctx.db.delete(usageId);
        }
    },
});

// For showing "X left today" in the UI.
export const getAiQuota = query({
    args: { kind: v.union(v.literal("interview"), v.literal("feedback")) },

    handler: async (ctx, { kind }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return null;

        const { remaining, perDay, waitMs } = await getUsage(
            ctx,
            identity.subject,
            kind,
            Date.now()
        );

        return { remaining, perDay, waitMs };
    },
});

// Daily cleanup (convex/crons.ts): rows older than 2 days no longer affect any limit.
export const deleteOldUsage = internalMutation({
    handler: async (ctx) => {
        const cutoff = Date.now() - 2 * DAY_MS;
        const old = await ctx.db
            .query("aiUsage")
            .filter((q) => q.lt(q.field("_creationTime"), cutoff))
            .take(500);

        for (const row of old) await ctx.db.delete(row._id);
    },
});
