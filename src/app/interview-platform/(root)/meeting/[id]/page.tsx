"use client";

import LoaderUI from "@/components/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

function MeetingPage() {
    const { id } = useParams();
    console.log(id);
    const { isLoaded } = useUser();

    const [isSetupComplete, setIsSetupComplete] = useState(false);

    const { call, isCallLoading } = useGetCallById(id as string);

    if (!isLoaded || isCallLoading) {
        return <LoaderUI />;
    }

    if (!call) {
        return (
            <div className="h-screen flex items-center justify-center bg-app-gray-50 dark:bg-app-gray-900">
                <p className="text-2xl font-semibold text-app-gray-900 dark:text-app-white">
                    Meeting not found
                </p>
            </div>
        );
    }

    return (
        <StreamCall call={call}>
            <StreamTheme>
                {!isSetupComplete ? (
                    <MeetingSetup
                        onSetupComplete={() => setIsSetupComplete(true)}
                    />
                ) : (
                    <MeetingRoom />
                )}
            </StreamTheme>
        </StreamCall>
    );
}

export default MeetingPage;
