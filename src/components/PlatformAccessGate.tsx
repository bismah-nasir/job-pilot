"use client";

import { useUserRole } from "@/hooks/useUserRole";
import LoaderUI from "./LoaderUI";
import PendingApprovalScreen from "./PendingApprovalScreen";

// Interviewers awaiting approval see only the waiting screen — no other platform pages.
function PlatformAccessGate({ children }: { children: React.ReactNode }) {
    const { isLoading, isPendingInterviewer, user } = useUserRole();

    if (isLoading) return <LoaderUI />;

    if (isPendingInterviewer) {
        return <PendingApprovalScreen email={user?.email} />;
    }

    return <>{children}</>;
}

export default PlatformAccessGate;
