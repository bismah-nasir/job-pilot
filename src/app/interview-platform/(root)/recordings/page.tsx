"use client";

import LoaderUI from "@/components/LoaderUI";
import RecordingCard from "@/components/RecordingCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetCalls from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

function RecordingsPage() {
    const { calls, isLoading } = useGetCalls();

    // 03 : 12 : 09
    const [recordings, setRecordings] = useState<CallRecording[]>([]);

    useEffect(() => {
        const fetchRecordings = async () => {
            if (!calls) {
                return;
            }

            try {
                // Get recordings for each call
                const callData = await Promise.all(
                    calls.map((call) => call.queryRecordings())
                );
                const allRecordings = callData.flatMap(
                    (call) => call.recordings
                );

                setRecordings(allRecordings);
            } catch (error) {
                console.log("Error fetching recordings:", error);
            }
        };

        fetchRecordings();
    }, [calls]);

    if (isLoading) {
        return <LoaderUI />;
    }
    return (
        <div className="container max-w-7xl mx-auto p-6 space-y-6">
            {/* HEADER SECTION */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-app-gray-900 dark:text-app-gray-100">
                    Recordings
                </h1>
                <p className="text-app-gray-500 dark:text-app-gray-400 text-sm">
                    You have{" "}
                    <span className="font-medium text-foreground">
                        {recordings.length}
                    </span>{" "}
                    {recordings.length === 1 ? "recording" : "recordings"}{" "}
                    available for review.
                </p>
            </div>

            {/* RECORDINGS GRID */}
            <ScrollArea className="h-[calc(100vh-16rem)]">
                {recordings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
                        {recordings.map((r) => (
                            <RecordingCard key={r.end_time} recording={r} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-100 gap-4 border-2 border-dashed border-app-gray-200 dark:border-app-gray-800 rounded-xl bg-app-gray-50/50 dark:bg-app-gray-900/50">
                        <p className="text-xl font-medium text-foreground">
                            No recordings available
                        </p>
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}

export default RecordingsPage;
