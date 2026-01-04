"use server";

import { api } from "../../../convex/_generated/api";
import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { fetchMutation } from "convex/nextjs";

interface CreateFeedbackParams {
    interviewId: string;
    userId: string;
    transcript: { role: string; content: string }[];
    feedbackId?: string;
}

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
    const { interviewId/*, userId*/, transcript } = params;

    try {
        const formattedTranscript = transcript
            .map(
                (sentence: { role: string; content: string }) =>
                    `- ${sentence.role}: ${sentence.content}\n`
            )
            .join("");
        
            console.log('Formatted:', formattedTranscript);

        
        const { output } = await generateText({
            model: google("gemini-2.5-flash-lite"),
            output: Output.object({
                schema: feedbackSchema,
            }),
            prompt: `
                You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
                Transcript:
                ${formattedTranscript}

                Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
                - **Communication Skills**: Clarity, articulation, structured responses.
                - **Technical Knowledge**: Understanding of key concepts for the role.
                - **Problem-Solving**: Ability to analyze problems and propose solutions.
                - **Cultural & Role Fit**: Alignment with company values and job role.
                - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
                `,
            system: "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
        });

        const {totalScore, categoryScores, strengths, areasForImprovement, finalAssessment} = output;

        const feedbackObj = {
            interviewId,
            // userId,
            totalScore,
            categoryScores,
            strengths,
            areasForImprovement,
            finalAssessment,
        }

        const feedbackId = await fetchMutation(api.feedbacks.createAIFeedback, feedbackObj);

        return {
            success: true,
            feedbackId,
        };
    } catch (error) {
        console.error("Error saving feedback", error);

        return {
            success: false,
        };
    }
}
