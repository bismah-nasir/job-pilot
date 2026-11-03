import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useUserRole = () => {
    // Wait until Convex has the Clerk token, otherwise the first result is "signed out"
    const { isLoading: isAuthLoading, isAuthenticated } = useConvexAuth();

    const userData = useQuery(
        api.users.getMe,
        isAuthenticated ? {} : "skip"
    );

    const isLoading = isAuthLoading || (isAuthenticated && userData === undefined);

    const isPendingInterviewer =
        userData?.role === "candidate" &&
        userData.interviewerRequest === "pending";

    return {
        isLoading,
        user: userData ?? null,
        isInterviewer: userData?.role === "interviewer",
        // Pending interviewers are not treated as candidates — they get no access until approved
        isCandidate: userData?.role === "candidate" && !isPendingInterviewer,
        isPendingInterviewer,
    };
};
