"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import toast from "react-hot-toast";
import { BriefcaseIcon, CalendarIcon, Code2Icon, Loader2Icon, StarIcon } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useUserRole } from "@/hooks/useUserRole";
import LoaderUI from "@/components/LoaderUI";
import { Button } from "@/components/ui/button";

const PERKS = [
    { icon: CalendarIcon, text: "Schedule interviews with candidates" },
    { icon: Code2Icon, text: "Run live coding sessions in the call" },
    { icon: StarIcon, text: "Rate, comment and pass / fail candidates" },
];

// Landing page "Sign in as Interviewer" buttons send people here after sign-in.
function BecomeInterviewerPage() {
    const router = useRouter();
    const { isLoading, user, isInterviewer } = useUserRole();
    const requestAccess = useMutation(api.users.requestInterviewerAccess);
    const [isRequesting, setIsRequesting] = useState(false);

    // Already an interviewer — nothing to request
    useEffect(() => {
        if (isInterviewer) router.replace("/interview-platform");
    }, [isInterviewer, router]);

    if (isLoading || isInterviewer) return <LoaderUI />;

    // Just signed up: the Clerk webhook hasn't created the Convex user yet.
    // useQuery is live, so this switches over as soon as the record exists.
    if (!user) {
        return (
            <div className="min-h-[calc(100vh-4rem-1px)] flex flex-col items-center justify-center gap-4 text-center">
                <Loader2Icon className="size-8 animate-spin text-app-purple-600" />
                <p className="text-app-gray-600 dark:text-app-gray-400">
                    Setting up your account...
                </p>
            </div>
        );
    }

    // Pending users never reach this point — PlatformAccessGate shows the waiting screen instead.

    const handleRequest = async () => {
        setIsRequesting(true);
        try {
            await requestAccess();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Could not send your request. Please try again."
            );
            setIsRequesting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem-1px)] flex items-center justify-center py-12">
            <div className="w-full max-w-xl rounded-2xl bg-app-white dark:bg-app-gray-800 border border-app-gray-200 dark:border-app-gray-700 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-app-purple-500 to-app-indigo-500"></div>

                <div className="p-8 sm:p-10 flex flex-col items-center text-center gap-6">
                    <div className="flex items-center justify-center size-16 rounded-full bg-app-purple-100 dark:bg-app-purple-900/30">
                        <BriefcaseIcon className="size-8 text-app-purple-600 dark:text-app-purple-300" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold bg-linear-to-r from-app-purple-600 to-app-purple-500 bg-clip-text text-transparent">
                            Request interviewer access?
                        </h1>
                        <p className="text-app-gray-600 dark:text-app-gray-400">
                            Interviewer accounts are verified by our team before they
                            can be used. Until then you won&apos;t have access to the
                            platform.
                        </p>
                    </div>

                    <ul className="w-full grid gap-3 text-left">
                        {PERKS.map(({ icon: Icon, text }) => (
                            <li
                                key={text}
                                className="flex items-center gap-3 rounded-xl border border-app-gray-200 dark:border-app-gray-700 p-3">
                                <Icon className="size-5 text-app-purple-600 dark:text-app-purple-400 shrink-0" />
                                <span className="text-sm text-app-gray-700 dark:text-app-gray-300">
                                    {text}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Button
                            onClick={() => router.push("/interview-platform")}
                            disabled={isRequesting}
                            className="px-6 py-2 border border-app-gray-300 dark:border-app-gray-600 text-app-gray-700 dark:text-app-gray-300 rounded-lg hover:bg-app-gray-50 dark:hover:bg-app-gray-700 bg-transparent shadow-none cursor-pointer">
                            Continue as Candidate
                        </Button>
                        <Button
                            onClick={handleRequest}
                            disabled={isRequesting}
                            className="px-6 py-2 bg-app-purple-600 text-app-white rounded-lg hover:bg-app-purple-700 shadow-sm cursor-pointer">
                            {isRequesting ? "Sending request..." : "Request Access"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BecomeInterviewerPage;
