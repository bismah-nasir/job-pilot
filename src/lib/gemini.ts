import "server-only";
import { google } from "@ai-sdk/google";
import { APICallError, RetryError, type LanguageModel } from "ai";

// Change the models in .env.local (GEMINI_MODEL / GEMINI_FALLBACK_MODEL) — no code edits needed.
const DEFAULT_GEMINI_MODEL = "gemini-3.1-flash-lite";
const DEFAULT_GEMINI_FALLBACK_MODEL = "gemini-2.5-flash-lite";

const primaryModel = () => process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
const fallbackModel = () =>
    process.env.GEMINI_FALLBACK_MODEL || DEFAULT_GEMINI_FALLBACK_MODEL;

// Retries per model. Kept low so an overloaded model fails over quickly
// instead of making the user wait ~40s.
export const GEMINI_MAX_RETRIES = 1;

// "High demand" (503), rate limits (429) and other temporary server errors.
// These requests are not billed, so retrying on another model is safe.
export const isGeminiBusyError = (error: unknown): boolean => {
    const cause = RetryError.isInstance(error) ? error.lastError : error;
    return (
        APICallError.isInstance(cause) &&
        (cause.isRetryable || [429, 500, 502, 503, 504].includes(cause.statusCode ?? 0))
    );
};

// Runs a Gemini request on the main model; if Google reports it is overloaded,
// runs it once more on the fallback model.
export const withGeminiFallback = async <T>(
    run: (model: LanguageModel) => Promise<T>
): Promise<T> => {
    const primary = primaryModel();

    try {
        return await run(google(primary));
    } catch (error) {
        const fallback = fallbackModel();

        if (!isGeminiBusyError(error) || !fallback || fallback === primary) {
            throw error;
        }

        console.warn(`Gemini model "${primary}" is busy — retrying with "${fallback}"`);
        return await run(google(fallback));
    }
};
