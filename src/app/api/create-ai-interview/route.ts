import { generateText, Output } from "ai";
import { z } from "zod";
import { GEMINI_MAX_RETRIES, isGeminiBusyError, withGeminiFallback } from "@/lib/gemini";
import { getRandomInterviewCover, normalizeTechTerms } from "@/lib/utils";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { getConvexToken } from "@/lib/convexAuth";

const questionsSchema = z.object({
    questions: z.array(z.string()),
});

export async function POST(request: Request) {
    // Reject signed-out callers before spending any Gemini credits
    const token = await getConvexToken();

    if (!token) {
        return Response.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    // Interviewers awaiting approval get no platform access (checked before any Gemini call)
    const me = await fetchQuery(api.users.getMe, {}, { token });

    if (me?.role === "candidate" && me.interviewerRequest === "pending") {
        return Response.json(
            { success: false, error: "Your interviewer account is awaiting approval" },
            { status: 403 }
        );
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return Response.json(
            { success: false, error: "Invalid request body" },
            { status: 400 }
        );
    }

    const { type, role, level, techstack } = body;
    const amount = 5;

    if (!type || !role || !level || typeof techstack !== "string") {
        return Response.json(
            { success: false, error: "Missing required fields" },
            { status: 400 }
        );
    }

    // Keep prompts small — long inputs only cost more Gemini tokens
    if (
        String(role).length > 100 ||
        techstack.length > 300 ||
        String(type).length > 30 ||
        String(level).length > 30
    ) {
        return Response.json(
            { success: false, error: "Some fields are too long" },
            { status: 400 }
        );
    }

    // Per-user daily limit + cooldown, reserved before the Gemini call
    const quota = await fetchMutation(
        api.aiUsage.consumeAiQuota,
        { kind: "interview" },
        { token }
    );

    if (!quota.ok) {
        return Response.json(
            { success: false, error: quota.message },
            { status: 429 }
        );
    }

    try {
        // Structured output guarantees a string array — no fragile JSON.parse on raw text
        // Falls back to a second model if Google reports the main one is overloaded
        const { output } = await withGeminiFallback((model) => generateText({
            model,
            maxRetries: GEMINI_MAX_RETRIES,
            output: Output.object({ schema: questionsSchema }),
            prompt: `Prepare questions for a job interview.
                The job role is ${role}.
                The job experience level is ${level}.
                The tech stack used in the job is: ${techstack}.
                The focus between behavioural and technical questions should lean towards: ${type}.
                The amount of questions required is: ${amount}.
                Please return only the questions, without any additional text.
                The questions may be read aloud by a voice assistant, so do not use "/", "*", "#", backticks, brackets or any markdown.
                Write technology names as one word without a dot, for example: NextJS, NodeJS, VueJS, ExpressJS, NestJS.
                Never spell punctuation out as words — do not write "dot", "slash" or "star".
            `,
        }));

        const questions = output.questions
            .map((q) => normalizeTechTerms(q.trim()))
            .filter((q) => q !== "");

        if (questions.length === 0) {
            throw new Error("No questions were generated");
        }

        const interview = {
            role,
            type,
            level,
            techstack: techstack
                .split(",")
                .map((tech: string) => tech.trim())
                .filter((tech: string) => tech !== ""),
            questions,
            coverImage: getRandomInterviewCover(),
        };

        // candidateId is taken from the token inside the mutation
        await fetchMutation(api.aiInterviews.createAIInterview, interview, {
            token,
        });

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);

        // Nothing was created, so don't count this attempt against the user
        await fetchMutation(
            api.aiUsage.refundAiQuota,
            { usageId: quota.usageId },
            { token }
        ).catch(console.error);

        if (isGeminiBusyError(error)) {
            return Response.json(
                {
                    success: false,
                    error: "The AI is busy right now. Please try again in a minute.",
                },
                { status: 503 }
            );
        }

        // Error objects serialize to {} — send a readable message instead
        const message =
            error instanceof Error ? error.message : "Failed to create interview";

        return Response.json({ success: false, error: message }, { status: 500 });
    }
}
