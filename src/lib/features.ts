// Feature switches, controlled from .env.local / Vercel env vars (restart the dev server after changing).

// VAPI voice interviews cost credits per minute. Off unless explicitly set to "true";
// while off, candidates use the written (chat) interview instead and VAPI is never called.
export const VOICE_INTERVIEW_ENABLED =
    process.env.NEXT_PUBLIC_VOICE_INTERVIEW_ENABLED === "true";
