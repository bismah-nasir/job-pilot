"use server";

import { api } from "../../../convex/_generated/api";
import { generateText, Output } from "ai";
import { GEMINI_MAX_RETRIES, isGeminiBusyError, withGeminiFallback } from "@/lib/gemini";
import { z } from "zod";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { getConvexToken } from "@/lib/convexAuth";

interface CreateFeedbackParams {
    interviewId: string;
    transcript: { role: string; content: string }[];
    // "voice" = VAPI call transcript, "written" = typed answers from the chat interview
    format?: "voice" | "written";
}

// Upper bounds checked before calling Gemini, so oversized input can't burn credits
const MAX_TRANSCRIPT_MESSAGES = 200;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_TRANSCRIPT_LENGTH = 40000;

const isValidTranscript = (transcript: unknown): transcript is CreateFeedbackParams["transcript"] => {
    if (!Array.isArray(transcript) || transcript.length === 0) return false;
    if (transcript.length > MAX_TRANSCRIPT_MESSAGES) return false;

    let total = 0;
    for (const message of transcript) {
        if (
            typeof message?.content !== "string" ||
            !["user", "assistant", "system"].includes(message?.role)
        ) {
            return false;
        }
        if (message.content.length > MAX_MESSAGE_LENGTH) return false;
        total += message.content.length;
    }

    return total <= MAX_TRANSCRIPT_LENGTH;
};

const feedbackSchema = z.object({
  totalScore: z.number(),
 categoryScores: z.array(
    z.object({
      name: z.enum([
        "Communication Skills",
        "Technical Knowledge",
        "Problem Solving",
        "Cultural Fit",
        "Confidence and Clarity",
      ]),
      score: z.number(),
      comment: z.string(),
    })
  ),  
strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export async function createFeedback(params: CreateFeedbackParams) {
    const { interviewId, transcript, format = "voice" } = params;
    let refundQuota: (() => Promise<unknown>) | null = null;

    try {
        if (!isValidTranscript(transcript)) return { success: false };

        const token = await getConvexToken();

        if (!token) return { success: false };

        // Make sure the interview exists and belongs to this user before spending Gemini credits
        const interview = await fetchQuery(
            api.aiInterviews.getAIInterviewById,
            { id: interviewId },
            { token }
        );

        if (!interview) return { success: false };

        // Per-user daily limit + cooldown, reserved before the Gemini call
        const quota = await fetchMutation(
            api.aiUsage.consumeAiQuota,
            { kind: "feedback" },
            { token }
        );

        if (!quota.ok) return { success: false, limitMessage: quota.message };

        // If anything below fails, the attempt shouldn't count against the user
        refundQuota = () =>
            fetchMutation(
                api.aiUsage.refundAiQuota,
                { usageId: quota.usageId },
                { token }
            );

        const formattedTranscript = transcript
            .map(
                (sentence: { role: string; content: string }) =>
                    `- ${sentence.role}: ${sentence.content}\n`
            )
            .join("");
        

        
        // Falls back to a second model if Google reports the main one is overloaded
        const { output } = await withGeminiFallback((model) => generateText({
            model,
            maxRetries: GEMINI_MAX_RETRIES,
            output: Output.object({
                schema: feedbackSchema,
            }),
            prompt: `
                You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
                ${
                    format === "written"
                        ? "This was a WRITTEN interview: the candidate typed their answers. Judge communication on clarity and structure of the writing, not on speech. Skipped questions count against the candidate."
                        : "This was a spoken interview transcribed from a voice call, so minor transcription errors are not the candidate's fault."
                }
                Transcript:
                ${formattedTranscript}

                Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
                - **Communication Skills**: Clarity, articulation, structured responses.
                - **Technical Knowledge**: Understanding of key concepts for the role.
                - **Problem Solving**: Ability to analyze problems and propose solutions.
                - **Cultural Fit**: Alignment with company values and job role.
                - **Confidence and Clarity**: Confidence in responses, engagement, and clarity.
                `,
            system: "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
        }));

        const {totalScore, categoryScores, strengths, areasForImprovement, finalAssessment} = output;

        const feedbackObj = {
            interviewId,
            totalScore,
            categoryScores,
            strengths,
            areasForImprovement,
            finalAssessment,
        }

        const feedbackId = await fetchMutation(
            api.feedbacks.createAIFeedback,
            feedbackObj,
            { token }
        );

        return {
            success: true,
            feedbackId,
        };
    } catch (error) {
        console.error("Error saving feedback", error);

        await refundQuota?.().catch(console.error);

        return {
            success: false,
            // Lets the UI say "try again in a minute" instead of a generic error
            isBusy: isGeminiBusyError(error),
        };
    }
}
