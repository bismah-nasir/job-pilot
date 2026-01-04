"use client";

import Image from "next/image";
import Agent from "@/components/ai/Agent";
import { useQuery } from "convex/react";
import DisplayTechIcons from "@/components/ai/DisplayTechIcons";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";

const InterviewCall = ({ id }: { id: string }) => {
    const { user } = useUser();
    const interview = useQuery(api.aiInterviews.getAIInterviewById, {
        id: id as Id<"aiInterviews">,
    });

    if (!interview) return null;

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
                            className="rounded-full object-cover size-[40px] border border-app-gray-200 dark:border-app-gray-700"
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
                userId={user?.id}
                interviewId={id}
                type="interview"
                questions={interview.questions}
            />
        </>
    );
};

export default InterviewCall;
