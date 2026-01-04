"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import toast from "react-hot-toast";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import LoaderUI from "@/components/LoaderUI";
import { getCandidateInfo, groupInterviews } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { INTERVIEW_CATEGORY } from "@/constants";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    CalendarIcon,
    CheckCircle2Icon,
    ClockIcon,
    XCircleIcon,
} from "lucide-react";
import { format } from "date-fns";
import CommentDialog from "@/components/CommentDialog";

type Interview = Doc<"interviews">;

function DashboardPage() {
    const users = useQuery(api.users.getUsers);
    const interviews = useQuery(api.interviews.getAllInterviews);
    const updateStatus = useMutation(api.interviews.updateInterviewStatus);

    // Function to handle updateStatus
    const handleStatusUpdate = async (
        interviewId: Id<"interviews">,
        status: string
    ) => {
        try {
            await updateStatus({ id: interviewId, status });
            toast.success(`Interview marked as ${status}`);
        } catch (error) {
            toast.success("Failed to update status");
        }
    };

    if (!interviews || !users) {
        return <LoaderUI />;
    }

    const groupedInterviews = groupInterviews(interviews);

    // Helper to get badge colors matching your reference snippet
    const getBadgeClassName = (categoryId: string) => {
        switch (categoryId) {
            case "upcoming":
                return "bg-app-blue-100 text-app-blue-700 dark:bg-app-blue-900/30 dark:text-app-blue-400";
            case "completed":
                return "bg-app-amber-100 text-app-amber-700 dark:bg-app-amber-900/30 dark:text-app-amber-400";
            case "succeeded":
                return "bg-app-green-100 text-app-green-700 dark:bg-app-green-900/30 dark:text-app-green-400";
            case "failed":
                return "bg-app-red-100 text-app-red-700 dark:bg-app-red-900/30 dark:text-app-red-400";
            default:
                return "bg-app-gray-100 text-app-gray-700 dark:bg-app-gray-800 dark:text-app-gray-400";
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center mb-8">
                <Link href="/interview-platform/schedule">
                    <Button className="h-12! px-6 py-3 bg-app-purple-600 text-[16px] text-app-white font-medium rounded-lg hover:bg-app-purple-700 shadow-sm hover:shadow-md transition-all whitespace-nowrap cursor-pointer">
                        Schedule New Interview
                    </Button>
                </Link>
            </div>

            <div className="space-y-12">
                {INTERVIEW_CATEGORY.map(
                    (category) =>
                        groupedInterviews[category.id]?.length > 0 && (
                            <section key={category.id}>
                                {/* Category Title & Badge */}
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-2xl font-bold text-app-gray-900 dark:text-app-white">
                                        {category.title}
                                    </h2>
                                    <Badge
                                        variant={category.variant}
                                        className={`px-3 py-1 rounded-full text-sm font-medium hover:bg-opacity-100 ${getBadgeClassName(category.id)} shadow-none border-0`}>
                                        {groupedInterviews[category.id].length}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {groupedInterviews[category.id].map(
                                        (interview: Interview) => {
                                            const candidateInfo =
                                                getCandidateInfo(
                                                    users,
                                                    interview.candidateId
                                                );
                                            const startTime = new Date(
                                                interview.startTime
                                            );

                                            return (
                                                <Card className="bg-app-white dark:bg-app-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all border border-app-gray-100 dark:border-app-gray-700 p-4">
                                                    {/* Candidate Info */}
                                                    <CardHeader className="p-2">
                                                        <div className="flex items-start gap-4">
                                                            <Avatar className="h-12 w-12 rounded-full">
                                                                <AvatarImage
                                                                    src={
                                                                        candidateInfo.image
                                                                    }
                                                                    className="object-cover"
                                                                />
                                                                <AvatarFallback className="bg-app-purple-100 text-app-purple-700">
                                                                    {
                                                                        candidateInfo.initials
                                                                    }
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1 min-w-0">
                                                                <CardTitle className="font-semibold text-app-gray-900 dark:text-app-white truncate text-base">
                                                                    {
                                                                        candidateInfo.name
                                                                    }
                                                                </CardTitle>
                                                                <p className="text-sm text-app-gray-500 dark:text-app-gray-400 truncate">
                                                                    {
                                                                        interview.title
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </CardHeader>

                                                    {/* Date and Time */}
                                                    <CardContent className="p-4 pt-0">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 text-sm text-app-gray-600 dark:text-app-gray-400">
                                                                <CalendarIcon className="w-4 h-4 flex items-center justify-center" />
                                                                <span>
                                                                    {format(
                                                                        startTime,
                                                                        "MMM dd, yyyy"
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-app-gray-600 dark:text-app-gray-400">
                                                                <ClockIcon className="w-4 h-4 flex items-center justify-center" />
                                                                <span>
                                                                    {format(
                                                                        startTime,
                                                                        "hh:mm a"
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </CardContent>

                                                    {/* Pass/Fail & Comments */}
                                                    <CardFooter className="p-4 pt-2 flex flex-col gap-3">
                                                        {interview.status ===
                                                            "completed" && (
                                                            <div className="flex gap-2 w-full mb-2">
                                                                <Button
                                                                    className="flex-1 px-4 py-2 bg-app-green-600 hover:bg-app-green-700 text-app-white text-sm font-medium rounded-lg shadow-sm transition-colors cursor-pointer"
                                                                    onClick={() =>
                                                                        handleStatusUpdate(
                                                                            interview._id,
                                                                            "succeeded"
                                                                        )
                                                                    }>
                                                                    Pass
                                                                </Button>

                                                                <Button
                                                                    className="flex-1 px-4 py-2 bg-app-red-600 hover:bg-app-red-700 text-app-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                                                                    onClick={() =>
                                                                        handleStatusUpdate(
                                                                            interview._id,
                                                                            "failed"
                                                                        )
                                                                    }>
                                                                    Fail
                                                                </Button>
                                                            </div>
                                                        )}

                                                        {/* This handles the 'Add Comment' button style from the snippet */}
                                                        <div className="w-full">
                                                            <CommentDialog
                                                                interviewId={
                                                                    interview._id
                                                                }
                                                            />
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            );
                                        }
                                    )}
                                </div>
                            </section>
                        )
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
