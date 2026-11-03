"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2Icon, MessageSquareTextIcon, SendIcon, SparklesIcon } from "lucide-react";
import { createFeedback } from "./feedback.action";
import { cn } from "@/lib/utils";

// Keep answers reasonably short — protects Gemini credits and matches the server-side cap
export const MAX_ANSWER_LENGTH = 2000;

const SKIPPED = "";

interface ChatInterviewProps {
    interviewId: string;
    questions: string[];
    userName: string;
}

// Written alternative to the VAPI voice interview: questions are shown one by one,
// the candidate types answers, and Gemini generates the same feedback as for a call.
const ChatInterview = ({ interviewId, questions, userName }: ChatInterviewProps) => {
    const router = useRouter();
    const storageKey = `chat-interview:${interviewId}`;

    // answers[i] === undefined → not answered yet, "" → skipped
    const [answers, setAnswers] = useState<(string | undefined)[]>([]);
    const [draft, setDraft] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submittedRef = useRef(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Restore progress after a refresh (kept only for this browser tab)
    useEffect(() => {
        try {
            const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
            const isValid =
                Array.isArray(saved) &&
                saved.length <= questions.length &&
                saved.every((a) => typeof a === "string" && a.length <= MAX_ANSWER_LENGTH);
            if (isValid) setAnswers(saved);
        } catch {
            // ignore broken saved state
        }
    }, [storageKey, questions.length]);

    useEffect(() => {
        if (answers.length > 0) {
            sessionStorage.setItem(storageKey, JSON.stringify(answers));
        }
    }, [answers, storageKey]);

    const currentIndex = answers.length;
    const isComplete = currentIndex >= questions.length;
    const answeredCount = answers.filter((a) => a && a.trim() !== "").length;

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [currentIndex]);

    const recordAnswer = (answer: string) => {
        if (isComplete) return;
        setAnswers((prev) => [...prev, answer]);
        setDraft("");
    };

    const handleSend = () => {
        const answer = draft.trim();
        if (!answer) return;
        recordAnswer(answer);
    };

    const handleRestart = () => {
        setAnswers([]);
        setDraft("");
        sessionStorage.removeItem(storageKey);
    };

    const handleGetFeedback = async () => {
        // One Gemini call per interview attempt, even on double-click
        if (submittedRef.current) return;

        if (answeredCount === 0) {
            toast.error("Answer at least one question to get feedback.");
            return;
        }

        submittedRef.current = true;
        setIsSubmitting(true);

        const transcript = [
            {
                role: "assistant",
                content: "Hello! Thank you for taking the time to do this written interview with me today.",
            },
            ...questions.flatMap((question, i) => [
                { role: "assistant", content: question },
                {
                    role: "user",
                    content: answers[i]?.trim() || "(The candidate skipped this question.)",
                },
            ]),
        ];

        const result = await createFeedback({
            interviewId,
            transcript,
            format: "written",
        });

        if (result.success && result.feedbackId) {
            sessionStorage.removeItem(storageKey);
            router.push(`/interview-platform/ai-prep/interview/${interviewId}/feedback`);
        } else {
            // Answers are kept, so the candidate can simply press "Get Feedback" again
            toast.error(
                "limitMessage" in result && result.limitMessage
                    ? `${result.limitMessage} Your answers are saved.`
                    : "isBusy" in result && result.isBusy
                      ? "The AI is busy right now. Your answers are saved — please try again in a minute."
                      : "Could not generate feedback. Please try again.",
                { duration: 6000 }
            );
            submittedRef.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <section className="max-w-6xl mx-auto w-full rounded-2xl bg-app-white dark:bg-app-gray-800 border border-app-gray-200 dark:border-app-gray-700 shadow-lg relative overflow-hidden mb-10">
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-app-purple-500 to-app-indigo-500"></div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 pt-8 pb-5 border-b border-app-gray-200 dark:border-app-gray-700">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-full bg-app-purple-100 dark:bg-app-purple-900/30">
                        <MessageSquareTextIcon className="size-5 text-app-purple-600 dark:text-app-purple-300" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-app-gray-900 dark:text-app-white">
                            Written Interview
                        </h2>
                        <p className="text-sm text-app-gray-600 dark:text-app-gray-400">
                            Answer each question in your own words, like you would in a real interview.
                        </p>
                    </div>
                </div>

                <div className="sm:w-56">
                    <div className="flex justify-between text-xs font-medium text-app-gray-600 dark:text-app-gray-400 mb-1.5">
                        <span>
                            {isComplete
                                ? "All questions done"
                                : `Question ${currentIndex + 1} of ${questions.length}`}
                        </span>
                        <span>{Math.round((Math.min(currentIndex, questions.length) / questions.length) * 100)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-app-gray-100 dark:bg-app-gray-700 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-linear-to-r from-app-purple-500 to-app-indigo-500 transition-all duration-500"
                            style={{
                                width: `${(Math.min(currentIndex, questions.length) / questions.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Conversation */}
            <div className="px-4 sm:px-6 py-6 space-y-5 max-h-[60vh] overflow-y-auto bg-app-gray-50/60 dark:bg-app-gray-900/30">
                {questions.slice(0, Math.min(currentIndex + 1, questions.length)).map((question, i) => (
                    <div key={i} className="space-y-5">
                        {/* AI question */}
                        <div className="flex items-start gap-3 max-w-[85%]">
                            <Image
                                src="/images/logo.png"
                                alt="AI Interviewer"
                                width={36}
                                height={36}
                                className="rounded-full object-cover size-9 shrink-0 border border-app-purple-100 dark:border-app-purple-900/50"
                            />
                            <div className="rounded-2xl rounded-tl-sm bg-app-white dark:bg-app-gray-800 border border-app-gray-200 dark:border-app-gray-700 px-4 py-3 shadow-sm">
                                <p className="text-xs font-semibold text-app-purple-600 dark:text-app-purple-300 mb-1">
                                    Question {i + 1}
                                </p>
                                <p className="text-app-gray-800 dark:text-app-gray-100">{question}</p>
                            </div>
                        </div>

                        {/* Candidate answer */}
                        {answers[i] !== undefined && (
                            <div className="flex items-start gap-3 max-w-[85%] ml-auto flex-row-reverse">
                                <Image
                                    src="/images/user-avatar.png"
                                    alt={userName || "You"}
                                    width={36}
                                    height={36}
                                    className="rounded-full object-cover size-9 shrink-0"
                                />
                                <div
                                    className={cn(
                                        "rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm whitespace-pre-wrap",
                                        answers[i] === SKIPPED
                                            ? "bg-app-gray-100 dark:bg-app-gray-700 text-app-gray-500 dark:text-app-gray-400 italic"
                                            : "bg-app-purple-600 text-app-white"
                                    )}>
                                    {answers[i] === SKIPPED ? "Skipped" : answers[i]}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isComplete && (
                    <div className="flex items-start gap-3 max-w-[85%]">
                        <Image
                            src="/images/logo.png"
                            alt="AI Interviewer"
                            width={36}
                            height={36}
                            className="rounded-full object-cover size-9 shrink-0 border border-app-purple-100 dark:border-app-purple-900/50"
                        />
                        <div className="rounded-2xl rounded-tl-sm bg-app-white dark:bg-app-gray-800 border border-app-gray-200 dark:border-app-gray-700 px-4 py-3 shadow-sm">
                            <p className="text-app-gray-800 dark:text-app-gray-100">
                                Thank you{userName ? `, ${userName.split(" ")[0]}` : ""}! That&apos;s
                                all the questions. You answered {answeredCount} of{" "}
                                {questions.length}. Click <strong>Get Feedback</strong> to see
                                your detailed evaluation.
                            </p>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input / actions */}
            <div className="px-4 sm:px-6 py-5 border-t border-app-gray-200 dark:border-app-gray-700">
                {!isComplete ? (
                    <div className="space-y-3">
                        <textarea
                            value={draft}
                            onChange={(e) => setDraft(e.target.value.slice(0, MAX_ANSWER_LENGTH))}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            rows={4}
                            placeholder="Type your answer here..."
                            className="w-full resize-y rounded-xl border border-app-gray-300 dark:border-app-gray-600 bg-app-white dark:bg-app-gray-900 text-app-gray-900 dark:text-app-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-app-purple-500"
                        />
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <span className="text-xs text-app-gray-500 dark:text-app-gray-400">
                                {draft.length}/{MAX_ANSWER_LENGTH} · Ctrl + Enter to send
                            </span>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => recordAnswer(SKIPPED)}
                                    className="px-5 py-2 text-sm font-medium rounded-lg border border-app-gray-300 dark:border-app-gray-600 text-app-gray-700 dark:text-app-gray-300 hover:bg-app-gray-50 dark:hover:bg-app-gray-700 transition-colors cursor-pointer">
                                    Skip
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={!draft.trim()}
                                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-lg bg-app-purple-600 text-app-white hover:bg-app-purple-700 transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                    <SendIcon className="size-4" />
                                    Send Answer
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row justify-end gap-3">
                        <button
                            onClick={handleRestart}
                            disabled={isSubmitting}
                            className="px-5 py-2 text-sm font-medium rounded-lg border border-app-gray-300 dark:border-app-gray-600 text-app-gray-700 dark:text-app-gray-300 hover:bg-app-gray-50 dark:hover:bg-app-gray-700 transition-colors cursor-pointer disabled:opacity-50">
                            Start Over
                        </button>
                        <button
                            onClick={handleGetFeedback}
                            disabled={isSubmitting || answeredCount === 0}
                            className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold rounded-lg bg-app-purple-600 text-app-white hover:bg-app-purple-700 transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                            {isSubmitting ? (
                                <>
                                    <Loader2Icon className="size-4 animate-spin" />
                                    Generating feedback...
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="size-4" />
                                    Get Feedback
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ChatInterview;
