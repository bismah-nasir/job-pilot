"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "./feedback.action";
import { VOICE_INTERVIEW_ENABLED } from "@/lib/features";
import { PhoneOffIcon } from "lucide-react";

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
    interviewId?: string;
    feedbackId?: string;
    type: "generate" | "interview";
    questions?: string[];
}

const Agent = ({
    userName,
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
    const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

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

        const onError = (error: Error) => {
            console.error("VAPI error", error);
            // If the call never connected, let the user try again
            setCallStatus((prev) =>
                prev === CallStatus.CONNECTING ? CallStatus.INACTIVE : prev
            );
        };

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

    // Always holds the latest transcript, so the feedback effect doesn't re-run on every message
    const messagesRef = useRef<SavedMessage[]>([]);
    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    // Guards against generating feedback more than once per call
    const feedbackRequestedRef = useRef(false);

    const handleGenerateFeedback = async (transcript: SavedMessage[]) => {
        const result = await createFeedback({
            interviewId: interviewId!,
            transcript,
        });

        if (result.success && result.feedbackId) {
            router.push(
                `/interview-platform/ai-prep/interview/${interviewId}/feedback`
            );
        } else {
            toast.error(
                "limitMessage" in result && result.limitMessage
                    ? result.limitMessage
                    : "Could not generate feedback. Please try again."
            );
            router.push("/interview-platform/ai-prep");
        }
    };

    useEffect(() => {
        if (callStatus !== CallStatus.FINISHED || feedbackRequestedRef.current)
            return;

        feedbackRequestedRef.current = true;
        setIsGeneratingFeedback(true);

        // Give VAPI a moment to deliver the last final transcripts
        const timer = setTimeout(() => {
            const transcript = messagesRef.current;
            const candidateSpoke = transcript.some((m) => m.role === "user");

            // Nothing to evaluate — don't spend a Gemini call on an empty interview
            if (!candidateSpoke) {
                toast.error("The interview ended before you answered any questions.");
                router.push("/interview-platform/ai-prep");
                return;
            }

            handleGenerateFeedback(transcript);
        }, 1500);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callStatus]);

    const handleCall = async () => {
        // Voice calls are switched off (VAPI credits) — never contact VAPI
        if (!VOICE_INTERVIEW_ENABLED) return;

        setCallStatus(CallStatus.CONNECTING);
        let formattedQuestions = "";

        if (questions) {
            formattedQuestions = questions
                .map((question) => `- ${question}`)
                .join("\n");
        }

        try {
            await vapi.start(interviewer, {
                variableValues: {
                    questions: formattedQuestions,
                },
            });
        } catch (error) {
            console.error("Failed to start call", error);
            toast.error("Could not start the call. Please try again.");
            setCallStatus(CallStatus.INACTIVE);
        }
    };

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);

        vapi.stop();
    };

    const latestMessage = messages[messages.length - 1]?.content;
    const isCallInactiveOrFinished =
        callStatus === CallStatus.INACTIVE ||
        callStatus === CallStatus.FINISHED;

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
                {!VOICE_INTERVIEW_ENABLED ? (
                    <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-app-amber-100 dark:border-app-amber-900/60 bg-app-amber-100/40 dark:bg-app-amber-900/10 px-6 py-4 text-center sm:text-left">
                        <div className="flex items-center justify-center size-11 shrink-0 rounded-full bg-app-amber-100 dark:bg-app-amber-900/30">
                            <PhoneOffIcon className="size-5 text-app-amber-700 dark:text-app-amber-400" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-app-gray-900 dark:text-app-white">
                                AI voice interviewer is unavailable
                            </p>
                            <p className="text-sm text-app-gray-600 dark:text-app-gray-400">
                                The voice call limit has been reached. Practise with
                                the written interview below — you&apos;ll get the
                                same AI feedback on your answers.
                            </p>
                        </div>
                        <button
                            disabled
                            className="inline-flex items-center justify-center gap-2 px-6 py-2 font-bold text-sm text-app-white bg-app-gray-400 dark:bg-app-gray-600 rounded-full cursor-not-allowed min-w-35">
                            <PhoneOffIcon className="size-4" />
                            Call Unavailable
                        </button>
                    </div>
                ) : callStatus !== "ACTIVE" ? (
                    <button
                        className="relative inline-flex items-center justify-center px-8 py-2 font-bold text-base text-app-white transition-all duration-200 bg-app-purple-600 hover:bg-app-purple-700 active:scale-95 border border-transparent rounded-full shadow-lg hover:shadow-app-purple-500/25 focus:outline-none focus:ring-4 focus:ring-app-purple-500/30 min-w-35 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                        onClick={handleCall}
                        disabled={
                            callStatus === CallStatus.CONNECTING ||
                            isGeneratingFeedback
                        }>
                        {/* Ping animation for connecting state */}
                        <span
                            className={cn(
                                "absolute animate-ping rounded-full opacity-75 bg-app-purple-400 h-full w-full",
                                callStatus !== "CONNECTING" && "hidden"
                            )}></span>

                        <span className="relative z-10 flex items-center gap-2">
                            {isGeneratingFeedback
                                ? "Generating feedback..."
                                : isCallInactiveOrFinished
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
