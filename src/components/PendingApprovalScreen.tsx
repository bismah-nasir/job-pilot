"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import toast from "react-hot-toast";
import {
    CheckCircle2Icon,
    HourglassIcon,
    ShieldCheckIcon,
    UserCheckIcon,
} from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";

const STEPS = [
    {
        icon: CheckCircle2Icon,
        title: "Account created",
        description: "You signed up as an interviewer.",
        state: "done",
    },
    {
        icon: HourglassIcon,
        title: "Verification in progress",
        description: "Our team is reviewing your request.",
        state: "current",
    },
    {
        icon: UserCheckIcon,
        title: "Access granted",
        description: "Schedule interviews, evaluate candidates and more.",
        state: "upcoming",
    },
] as const;

function PendingApprovalScreen({ email }: { email?: string }) {
    const withdrawRequest = useMutation(api.users.withdrawInterviewerRequest);
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    const handleWithdraw = async () => {
        setIsWithdrawing(true);
        try {
            await withdrawRequest();
            toast.success("You're now using JobPilot as a candidate");
        } catch {
            toast.error("Something went wrong. Please try again.");
            setIsWithdrawing(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem-1px)] flex items-center justify-center py-12">
            <div className="w-full max-w-2xl rounded-2xl bg-app-white dark:bg-app-gray-800 border border-app-gray-200 dark:border-app-gray-700 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-app-purple-500 to-app-indigo-500"></div>

                <div className="p-8 sm:p-10 flex flex-col items-center text-center gap-6">
                    {/* Icon */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-app-purple-500/20 blur-2xl rounded-full"></div>
                        <div className="relative flex items-center justify-center size-20 rounded-full border-4 border-app-purple-100 dark:border-app-purple-900/50 bg-app-purple-50 dark:bg-app-gray-900">
                            <ShieldCheckIcon className="size-10 text-app-purple-600 dark:text-app-purple-400" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="space-y-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-app-purple-100 text-app-purple-700 dark:bg-app-purple-900/30 dark:text-app-purple-300">
                            <span className="size-2 rounded-full bg-app-purple-500 animate-pulse"></span>
                            Pending verification
                        </span>
                        <h1 className="text-3xl font-bold bg-linear-to-r from-app-purple-600 to-app-purple-500 bg-clip-text text-transparent">
                            Your interviewer account is under review
                        </h1>
                        <p className="text-app-gray-600 dark:text-app-gray-400 max-w-lg mx-auto">
                            Thanks for joining JobPilot as an interviewer! To keep
                            every interview fair and secure, our team verifies each
                            interviewer before giving access to the platform.
                        </p>
                    </div>

                    {/* Steps */}
                    <ol className="w-full grid gap-3 text-left">
                        {STEPS.map(({ icon: Icon, title, description, state }) => (
                            <li
                                key={title}
                                className={`flex items-start gap-4 rounded-xl border p-4 ${
                                    state === "current"
                                        ? "border-app-purple-300 dark:border-app-purple-700 bg-app-purple-50/60 dark:bg-app-purple-900/10"
                                        : "border-app-gray-200 dark:border-app-gray-700"
                                }`}>
                                <div
                                    className={`flex items-center justify-center size-9 shrink-0 rounded-full ${
                                        state === "done"
                                            ? "bg-app-green-100 text-app-green-600 dark:bg-app-green-900/30 dark:text-app-green-400"
                                            : state === "current"
                                              ? "bg-app-purple-100 text-app-purple-600 dark:bg-app-purple-900/30 dark:text-app-purple-300"
                                              : "bg-app-gray-100 text-app-gray-400 dark:bg-app-gray-700 dark:text-app-gray-500"
                                    }`}>
                                    <Icon
                                        className={`size-5 ${state === "current" ? "animate-pulse" : ""}`}
                                    />
                                </div>
                                <div>
                                    <p
                                        className={`font-semibold ${
                                            state === "upcoming"
                                                ? "text-app-gray-400 dark:text-app-gray-500"
                                                : "text-app-gray-900 dark:text-app-white"
                                        }`}>
                                        {title}
                                    </p>
                                    <p className="text-sm text-app-gray-600 dark:text-app-gray-400">
                                        {description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <p className="text-sm text-app-gray-500 dark:text-app-gray-400">
                        {email ? (
                            <>
                                We&apos;ll verify the account for{" "}
                                <span className="font-medium text-app-gray-900 dark:text-app-white">
                                    {email}
                                </span>
                                .{" "}
                            </>
                        ) : null}
                        This page updates automatically once you&apos;re approved
                        — no need to refresh.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Button
                            asChild
                            className="px-6 py-2 border border-app-gray-300 dark:border-app-gray-600 text-app-gray-700 dark:text-app-gray-300 rounded-lg hover:bg-app-gray-50 dark:hover:bg-app-gray-700 bg-transparent shadow-none">
                            <Link href="/">Back to Home</Link>
                        </Button>
                        <Button
                            onClick={handleWithdraw}
                            disabled={isWithdrawing}
                            className="px-6 py-2 bg-app-purple-600 text-app-white rounded-lg hover:bg-app-purple-700 shadow-sm cursor-pointer">
                            {isWithdrawing
                                ? "Switching..."
                                : "Continue as a Candidate Instead"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PendingApprovalScreen;
