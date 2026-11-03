"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/hooks/useUserRole";
import LoaderUI from "./LoaderUI";

// Renders children only for interviewers; everyone else is sent back to the platform home.
function InterviewerGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isInterviewer, isLoading } = useUserRole();

    useEffect(() => {
        if (!isLoading && !isInterviewer) {
            router.replace("/interview-platform");
        }
    }, [isLoading, isInterviewer, router]);

    if (isLoading || !isInterviewer) {
        return <LoaderUI />;
    }

    return <>{children}</>;
}

export default InterviewerGuard;
