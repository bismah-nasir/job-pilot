"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "./feedback.action";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

interface AgentProps {
    userName: string;
    userId?: string;
    interviewId?: string;
    feedbackId?: string;
    type: "generate" | "interview";
    questions?: string[];
}

const Agent = ({
    userName,
    userId,
    type,
    interviewId,
    questions,
}: AgentProps) => {
    const router = useRouter();

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(
        CallStatus.INACTIVE
    );
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = (message: Message) => {
            if (
                message.type === "transcript" &&
                message.transcriptType === "final"
            ) {
                const newMessage = {
                    role: message.role,
                    content: message.transcript,
                };

                setMessages((prev) => [...prev, newMessage]);
            }
        };

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log("Error", error);

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);
        vapi.on("error", onError);

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
            vapi.off("error", onError);
        };
    }, []);

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
        const { success, feedbackId: id } = await createFeedback({
            interviewId: interviewId!,
            userId: userId!,
            transcript: messages,
        });

        if (success && id) {
            router.push(
                `/interview-platform/ai-prep/interview/${interviewId}/feedback`
            );
        } else {
            console.log("Error saving feedback");
            router.push("/interview-platform/ai-prep");
        }
    };

    useEffect(() => {
        if (callStatus === CallStatus.FINISHED) {
            handleGenerateFeedback(messages);
        }
    }, [messages, callStatus, type, userId]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        let formattedQuestions = "";

        if (questions) {
            formattedQuestions = questions
                .map((question) => `- ${question}`)
                .join("\n");
        }

        await vapi.start(interviewer, {
            variableValues: {
                questions: formattedQuestions,
            },
        });
    };

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);

        vapi.stop();
    };

    const latestMessage = messages[messages.length - 1]?.content;
    const isCallInactiveOrFinished =
        callStatus === CallStatus.INACTIVE ||
        callStatus === CallStatus.FINISHED;

    // Original CSS
    // return (
    //     <>
    //         <div className="call-view">
    //             <div className="card-interviewer">
    //                 <div className="avatar">
    //                     <Image
    //                         src="/ai-avatar.png"
    //                         alt="vapi"
    //                         width={65}
    //                         height={54}
    //                         className="object-cover"
    //                     />
    //                     {isSpeaking && <span className="animate-speak" />}
    //                 </div>

    //                 <h3>AI Interviewer</h3>
    //             </div>

    //             <div className="card-border">
    //                 <div className="card-content">
    //                     <Image
    //                         src="/user-avatar.png"
    //                         alt="user avatar"
    //                         width={540}
    //                         height={540}
    //                         className="rounded-full object-cover size-[120px]"
    //                     />

    //                     <h3>{userName}</h3>
    //                 </div>
    //             </div>
    //         </div>

    //         {messages.length > 0 && (
    //             <div className="transcript-border">
    //                 <div className="transcript">
    //                     <p
    //                         key={latestMessage}
    //                         className={cn(
    //                             "transition-opacity duration-500 opacity-0",
    //                             "animate-fadeIn opacity-100"
    //                         )}>
    //                         {latestMessage}
    //                     </p>
    //                 </div>
    //             </div>
    //         )}

    //         <div className="w-full flex justify-center">
    //             {callStatus !== "ACTIVE" ? (
    //                 <button className="relative btn-call" onClick={handleCall}>
    //                     <span
    //                         className={cn(
    //                             "absolute animate-ping rounded-full opacity-75",
    //                             callStatus !== "CONNECTING" && "hidden"
    //                         )}></span>

    //                     <span>
    //                         {isCallInactiveOrFinished ? "Call" : ". . . "}
    //                     </span>
    //                 </button>
    //             ) : (
    //                 <button
    //                     className="btn-disconnect"
    //                     onClick={handleDisconnect}>
    //                     End
    //                 </button>
    //             )}
    //         </div>
    //     </>
    // );

    // CLass CSS
    // return (
    //     <>
    //         <div className="flex sm:flex-row flex-col gap-10 items-center justify-between w-full">
    //             <div className="flex-center flex-col gap-2 p-7 h-[400px] blue-gradient-dark rounded-lg border-2 border-primary-200/50 flex-1 sm:basis-1/2 w-full">
    //                 <div className="z-10 flex items-center justify-center blue-gradient rounded-full size-[120px] relative">
    //                     <Image
    //                         src="/images/logo.png"
    //                         alt="vapi"
    //                         width={540}
    //                         height={540}
    //                         className="rounded-full object-cover size-[120px]"
    //                     />
    //                     {isSpeaking && <span className="animate-speak" />}
    //                 </div>

    //                 <h3>AI Interviewer</h3>
    //             </div>

    //             <div className="border-gradient p-0.5 rounded-2xl flex-1 sm:basis-1/2 w-full h-[400px] max-md:hidden">
    //                 <div className="flex flex-col gap-2 justify-center items-center p-7 dark-gradient rounded-2xl min-h-full">
    //                     <Image
    //                         src="/images/user-avatar.png"
    //                         alt="user avatar"
    //                         width={540}
    //                         height={540}
    //                         className="rounded-full object-cover size-[120px]"
    //                     />

    //                     <h3>{userName}</h3>
    //                 </div>
    //             </div>
    //         </div>

    //         {messages.length > 0 && (
    //             <div className="border-gradient p-0.5 rounded-2xl w-full">
    //                 <div className="dark-gradient rounded-2xl  min-h-12 px-5 py-3 flex items-center justify-center">
    //                     <p
    //                         key={latestMessage}
    //                         className={cn(
    //                             "text-lg text-center text-white transition-opacity duration-500 opacity-0",
    //                             "animate-fadeIn opacity-100"
    //                         )}>
    //                         {latestMessage}
    //                     </p>
    //                 </div>
    //             </div>
    //         )}

    //         <div className="w-full flex justify-center">
    //             {callStatus !== "ACTIVE" ? (
    //                 <button
    //                     className="relative inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors duration-150 bg-success-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-success-200 hover:bg-success-200 min-w-28 cursor-pointer items-center justify-center overflow-visible"
    //                     onClick={handleCall}>
    //                     <span
    //                         className={cn(
    //                             "absolute animate-ping rounded-full opacity-75 bg-success-100 h-[85%] w-[65%]",
    //                             callStatus !== "CONNECTING" && "hidden"
    //                         )}></span>

    //                     <span>
    //                         {isCallInactiveOrFinished ? "Call" : ". . . "}
    //                     </span>
    //                 </button>
    //             ) : (
    //                 <button
    //                     className="inline-block px-7 py-3 text-sm font-bold leading-5 text-white transition-colors duration-150 bg-destructive-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-destructive-200 hover:bg-destructive-200 min-w-28"
    //                     onClick={handleDisconnect}>
    //                     End
    //                 </button>
    //             )}
    //         </div>
    //     </>
    // );

    // Final CSS
    return (
        <>
            <div className="flex sm:flex-row flex-col gap-10 items-center justify-between max-w-6xl mx-auto mt-6">
                {/* AI INTERVIEWER CARD */}
                <div className="flex items-center justify-center flex-col gap-4 p-7 h-100 w-full flex-1 sm:basis-1/2 rounded-2xl bg-app-white dark:bg-app-gray-800 border border-app-gray-200 dark:border-app-gray-700 shadow-lg relative overflow-hidden">
                    {/* Background decorative glow */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-app-purple-500 to-app-indigo-500"></div>

                    <div className="z-10 flex items-center justify-center relative">
                        {/* Glowing ring effect behind logo */}
                        <div className="absolute inset-0 bg-app-purple-500/20 blur-2xl rounded-full"></div>

                        <div className="relative p-1 rounded-full border-4 border-app-purple-100 dark:border-app-purple-900/50 bg-app-white dark:bg-app-gray-900">
                            <Image
                                src="/images/logo.png"
                                alt="vapi"
                                width={120}
                                height={120}
                                className="rounded-full object-cover w-30 h-30"
                            />
                        </div>
                        {isSpeaking && (
                            <span className="absolute inset-0 rounded-full animate-ping bg-app-purple-400/30"></span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-app-gray-900 dark:text-app-white mt-4">
                        AI Interviewer
                    </h3>
                </div>

                {/* USER CARD (Hidden on mobile as per original) */}
                <div className="flex items-center justify-center flex-col gap-4 p-7 h-100 w-full flex-1 sm:basis-1/2 rounded-2xl bg-app-white dark:bg-app-gray-800 border border-app-gray-200 dark:border-app-gray-700 shadow-lg max-md:hidden relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-app-gray-300 to-app-gray-400 dark:from-app-gray-600 dark:to-app-gray-700"></div>

                    <div className="flex flex-col gap-4 justify-center items-center min-h-full">
                        <div className="relative p-1 rounded-full border-4 border-app-gray-100 dark:border-app-gray-700 bg-app-white dark:bg-app-gray-900">
                            <Image
                                src="/images/user-avatar.png"
                                alt="user avatar"
                                width={120}
                                height={120}
                                className="rounded-full object-cover w-30 h-30"
                            />
                        </div>

                        <h3 className="text-xl font-bold text-app-gray-900 dark:text-app-white">
                            {userName}
                        </h3>
                    </div>
                </div>
            </div>

            {/* MESSAGES / TRANSCRIPTION */}
            {messages.length > 0 && (
                <div className="w-full">
                    <div className="bg-app-gray-50 dark:bg-app-gray-800/50 border border-app-gray-200 dark:border-app-gray-700 rounded-2xl min-h-16 px-6 py-4 flex items-center justify-center shadow-sm backdrop-blur-sm">
                        <p
                            key={latestMessage}
                            className={cn(
                                "text-lg text-center font-medium text-app-gray-700 dark:text-app-gray-200 transition-opacity duration-500 opacity-0",
                                "animate-fadeIn opacity-100"
                            )}>
                            {latestMessage}
                        </p>
                    </div>
                </div>
            )}

            {/* CONTROLS */}
            <div className="w-full flex justify-center py-6">
                {callStatus !== "ACTIVE" ? (
                    <button
                        className="relative inline-flex items-center justify-center px-8 py-2 font-bold text-base text-app-white transition-all duration-200 bg-app-purple-600 hover:bg-app-purple-700 active:scale-95 border border-transparent rounded-full shadow-lg hover:shadow-app-purple-500/25 focus:outline-none focus:ring-4 focus:ring-app-purple-500/30 min-w-35"
                        onClick={handleCall}>
                        {/* Ping animation for connecting state */}
                        <span
                            className={cn(
                                "absolute animate-ping rounded-full opacity-75 bg-app-purple-400 h-full w-full",
                                callStatus !== "CONNECTING" && "hidden"
                            )}></span>

                        <span className="relative z-10 flex items-center gap-2">
                            {isCallInactiveOrFinished
                                ? "Start Call"
                                : "Connecting..."}
                        </span>
                    </button>
                ) : (
                    <button
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-app-white transition-all duration-200 bg-app-red-500 hover:bg-app-red-600 active:scale-95 border border-transparent rounded-full shadow-lg hover:shadow-app-red-500/25 focus:outline-none focus:ring-4 focus:ring-app-red-500/30 min-w-35"
                        onClick={handleDisconnect}>
                        End Call
                    </button>
                )}
            </div>
        </>
    );
};

export default Agent;
