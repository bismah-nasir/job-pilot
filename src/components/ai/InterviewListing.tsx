"use client";

import InterviewCard from "@/components/ai/InterviewCard";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const InterviewListing = () => {
    const userInterviews = useQuery(api.aiInterviews.getMyAIInterviews);
    const hasPastInterviews = userInterviews && userInterviews?.length > 0;

    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-app-gray-900 dark:text-app-white">
                Your Interviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {hasPastInterviews ? (
                    userInterviews?.map((interview) => (
                        <InterviewCard {...interview} key={interview._id} />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center bg-app-gray-50 dark:bg-app-gray-800/50 rounded-2xl border border-dashed border-app-gray-300 dark:border-app-gray-700">
                        <p className="text-app-gray-500 dark:text-app-gray-400">
                            You haven&apos;t taken any interviews yet.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default InterviewListing;
