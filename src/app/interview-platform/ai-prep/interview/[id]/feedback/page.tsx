import { redirect } from "next/navigation";

import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "../../../../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "../../../../../../../convex/_generated/dataModel";

interface RouteParams {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
}

const Page = async ({ params }: RouteParams) => {
    const { id } = await params;

    const interview = await fetchQuery(api.aiInterviews.getAIInterviewById, {
        id: id as Id<"aiInterviews">,
    });

    if (!interview) {
        redirect("/");
    }

    const feedback = await fetchQuery(api.feedbacks.getFeedbackByInterviewId, {
        interviewId: id,
    });

    return (
        <section className="flex flex-col gap-8 max-w-5xl mx-auto max-sm:px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                    Feedback on the{" "}
                    <span className="text-purple-600 dark:text-purple-400 capitalize">
                        {interview.role}
                    </span>{" "}
                    Interview
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Detailed analysis of your performance
                </p>
            </div>

            {/* Score and Date Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
                {/* Overall Impression */}
                <div className="flex flex-row gap-3 items-center">
                    <div className="p-2 bg-yellow-900/60 dark:bg-yellow-900/30 rounded-full">
                        <Image
                            src="/images/star.svg"
                            width={24}
                            height={24}
                            alt="star"
                            className="w-6 h-6"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Overall Score
                        </span>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            <span className="text-purple-600 dark:text-purple-400">
                                {feedback?.totalScore}
                            </span>
                            <span className="text-gray-400 text-lg">/100</span>
                        </p>
                    </div>
                </div>

                <div className="h-10 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

                {/* Date */}
                <div className="flex flex-row gap-3 items-center">
                    <div className="p-2 bg-purple-900/60 dark:bg-purple-900/30 rounded-full">
                        <Image
                            src="/images/calendar.svg"
                            width={24}
                            height={24}
                            alt="calendar"
                            className="w-6 h-6"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Date Taken
                        </span>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                            {feedback?._creationTime
                                ? dayjs(feedback._creationTime).format(
                                      "MMM D, YYYY h:mm A"
                                  )
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Final Assessment Quote */}
            <div className="bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500 p-6 rounded-r-xl">
                <h3 className="text-purple-800 dark:text-purple-300 font-semibold mb-2 text-sm uppercase tracking-wider">
                    Final Assessment
                </h3>
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed text-lg">
                    &quot;{feedback?.finalAssessment}&quot;
                </p>
            </div>

            {/* Interview Breakdown */}
            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Category Breakdown
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    {feedback?.categoryScores?.map((category, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:border-purple-200 transition-colors">
                            <div className="md:w-1/4 min-w-fit">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300">
                                        {index + 1}
                                    </span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {category.name}
                                    </h3>
                                </div>
                                <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                    Score: {category.score}/10
                                </span>
                            </div>
                            <div className="md:w-3/4">
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    {category.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strengths & Improvements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                {/* Strengths */}
                <div className="flex flex-col gap-4 p-6 bg-green-50/50 dark:bg-gray-800 rounded-2xl border border-green-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="text-green-600">✓</span> Strengths
                    </h3>
                    <ul className="space-y-3">
                        {feedback?.strengths?.map((strength, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                                {strength}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="flex flex-col gap-4 p-6 bg-red-50/50 dark:bg-gray-800 rounded-2xl border border-red-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="text-red-500">!</span> Areas for
                        Improvement
                    </h3>
                    <ul className="space-y-3">
                        {feedback?.areasForImprovement?.map((area, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                                {area}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full justify-center gap-4 max-sm:flex-col pt-8">
                <Button
                    asChild
                    className="rounded-full px-8 py-6 font-semibold bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 shadow-sm transition-all">
                    <Link href="/interview-platform/ai-prep">
                        Back to Dashboard
                    </Link>
                </Button>

                <Button
                    asChild
                    className="rounded-full px-8 py-6 font-semibold bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg shadow-purple-200 dark:shadow-none transition-all border border-transparent">
                    <Link href={`/interview-platform/ai-prep/interview/${id}`}>
                        Retake Interview
                    </Link>
                </Button>
            </div>
        </section>
    );
};

export default Page;
