"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import MockInterviewBanner from "@/components/MockInterviewBanner";

export default function Home() {
    const { isInterviewer, isCandidate, isLoading } = useUserRole();
    const interviews = useQuery(api.interviews.getMyInterviews);
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"start" | "join">();

    const handleQuickAction = (title: string) => {
        switch (title) {
            case "New Call":
                setModalType("start");
                setShowModal(true);
                break;

            case "Join Interview":
                setModalType("join");
                setShowModal(true);
                break;

            default:
                router.push(`interview-platform/${title.toLowerCase()}`);
                break;
        }
    };

    if (isLoading) {
        return <LoaderUI />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="bg-app-white dark:bg-app-gray-800 rounded-lg bg-card p-6 border border-app-gray-100 dark:border-app-gray-700 shadow-sm mb-10">
                <h1 className="text-4xl font-bold bg-linear-to-r from-app-purple-600 to-app-purple-500 bg-clip-text text-transparent">
                    Welcome back!
                </h1>

                <p className="text-app-gray-600 dark:text-app-gray-400 mt-2">
                    {isInterviewer
                        ? "Manage your interviews and review candidate effectively."
                        : "Access your upcoming interiews and preparations."}
                </p>
            </div>

            {isInterviewer ? (
                <>
                    {/* Interviewer View */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {QUICK_ACTIONS.map((action) => (
                            <ActionCard
                                key={action.title}
                                action={action}
                                onClick={() => handleQuickAction(action.title)}
                            />
                        ))}
                    </div>

                    <MeetingModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        title={
                            modalType === "join"
                                ? "Join Meeting"
                                : "Start Meeting"
                        }
                        isJoinMeeting={modalType === "join"}
                    />
                </>
            ) : (
                <>
                    {/* Candidate View */}

                    {/* AI Mock Interview Banner */}
                    <MockInterviewBanner />

                    <div className="bg-app-white dark:bg-app-gray-800 rounded-lg bg-card p-6 border border-app-gray-100 dark:border-app-gray-700 shadow-sm mb-10">
                        <div>
                            <h1 className="text-2xl font-bold text-app-gray-900 dark:text-app-white">
                                Your Interviews
                            </h1>
                            <p className="text-md text-app-gray-600 dark:text-app-gray-400 mt-1">
                                View and join your scheduled interviews
                            </p>
                        </div>

                        <div className="mt-8">
                            {interviews === undefined ? (
                                <div className="flex justify-center py-12">
                                    <Loader2Icon className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
                                </div>
                            ) : interviews.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {interviews.map((interview) => (
                                        <MeetingCard
                                            key={interview._id}
                                            interview={interview}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-md text-app-gray-600 dark:text-app-gray-400">
                                    You have no scheduled interviews at the
                                    moment
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
