"use client";

import Image from "next/image";
import Agent from "@/components/ai/Agent";
import { useQuery } from "convex/react";
import DisplayTechIcons from "@/components/ai/DisplayTechIcons";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import LoaderUI from "@/components/LoaderUI";
import { normalizeTechTerms } from "@/lib/utils";
import ChatInterview from "@/components/ai/ChatInterview";
import { VOICE_INTERVIEW_ENABLED } from "@/lib/features";

const InterviewCall = ({ id }: { id: string }) => {
    const { user } = useUser();
    const interview = useQuery(api.aiInterviews.getAIInterviewById, {
        id,
    });

    // undefined = still loading, null = not found / not yours
    if (interview === undefined) return <LoaderUI />;

    if (interview === null) {
        return (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
                <p className="text-2xl font-semibold text-app-gray-900 dark:text-app-white">
                    Interview not found
                </p>
                <Link
                    href="/interview-platform/ai-prep"
                    className="text-app-purple-600 hover:underline">
                    Back to AI Prep
                </Link>
            </div>
        );
    }

    // Also fixes interviews saved before the prompt change ("Next dot js" → "NextJS")
    const questions = interview.questions.map(normalizeTechTerms);

    return (
        <>
            <div className="flex flex-row gap-4 justify-between items-center w-full mt-6">
                <div className="flex flex-row gap-4 items-center max-sm:flex-col">
                    <div className="flex flex-row gap-4 items-center">
                        <Image
                            src={interview.coverImage}
                            alt="cover-image"
                            width={40}
                            height={40}
                            className="rounded-full object-cover size-10 border border-app-gray-200 dark:border-app-gray-700"
                        />
                        <h3 className="capitalize font-semibold text-app-gray-900 dark:text-app-white">
                            {interview.role} Interview
                        </h3>
                    </div>

                    <DisplayTechIcons techStack={interview.techstack} />
                </div>

                {/* Badge updated to Purple/Gray Theme */}
                <p className="flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold h-fit capitalize bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800">
                    {interview.type}
                </p>
            </div>

            <Agent
                userName={user?.fullName || ""}
                interviewId={id}
                type="interview"
                questions={questions}
            />

            {/* Voice calls are off (VAPI credits) — candidates practise in writing instead */}
            {!VOICE_INTERVIEW_ENABLED && (
                <ChatInterview
                    interviewId={id}
                    questions={questions}
                    userName={user?.fullName || ""}
                />
            )}
        </>
    );
};

export default InterviewCall;
