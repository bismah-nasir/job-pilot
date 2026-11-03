








"use client";

import Link from "next/link";
import {
    Sparkles,
    Mic,
    BarChart2,
    RefreshCw,
    Target,
    PlayCircle,
    Bot,
    Lightbulb,
    Star,
} from "lucide-react";

export default function MockInterviewBanner() {
    return (
        <div className="mb-8 relative overflow-hidden rounded-2xl bg-linear-to-br from-app-purple-600 via-app-purple-500 to-app-purple-700 dark:from-app-purple-700 dark:via-app-purple-600 dark:to-app-purple-800 shadow-lg">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-app-purple-400/20 to-pink-400/20 blur-3xl"></div>

            <div className="relative px-8 py-10 lg:px-12 lg:py-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Text Content */}
                    <div className="flex-1 text-white">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-4">
                            <Sparkles className="h-3 w-3" />
                            AI POWERED
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                            Prepare Smarter with AI Mock Interviews
                        </h2>

                        <p className="text-purple-100 text-base lg:text-lg mb-6 leading-relaxed">
                            Practice real interview questions, get instant
                            feedback, and boost your confidence before the real
                            interview.
                        </p>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-purple-50">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <Mic className="h-4 w-4" />
                                </div>
                                <span>Real-time AI interviewer</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-purple-50">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <BarChart2 className="h-4 w-4" />
                                </div>
                                <span>Performance feedback & scoring</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-purple-50">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <RefreshCw className="h-4 w-4" />
                                </div>
                                <span>Retake interviews anytime</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-purple-50">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <Target className="h-4 w-4" />
                                </div>
                                <span>Role & tech-specific questions</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/interview-platform/schedule">
                                <button className="w-full sm:w-auto px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 hover:shadow-xl transform hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                                    <PlayCircle className="h-5 w-5" />
                                    Start AI Mock Interview
                                </button>
                            </Link>

                            {/* Optional: Add Link here if you have a past sessions page */}
                            <button className="w-full sm:w-auto px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/20 border border-white/30 transition-all whitespace-nowrap cursor-pointer">
                                View Past Practice Sessions
                            </button>
                        </div>
                    </div>

                    {/* Right Illustration (Robot) */}
                    <div className="shrink-0 relative">
                        <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                            {/* Pulsing Background */}
                            <div className="absolute inset-0 bg-linear-to-br from-white/30 to-purple-300/30 rounded-full blur-2xl animate-pulse"></div>

                            {/* Main Circle */}
                            <div className="relative w-full h-full bg-linear-to-br from-white/20 to-white/5 backdrop-blur-md rounded-full border-2 border-white/30 flex items-center justify-center shadow-2xl">
                                <div className="w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center">
                                    <Bot className="h-20 w-20 lg:h-24 lg:w-24 text-white opacity-90" />
                                </div>
                            </div>

                            {/* Floating Icons */}
                            <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full border border-white/40 flex items-center justify-center animate-bounce">
                                <Lightbulb className="h-5 w-5 text-white" />
                            </div>

                            <div
                                className="absolute -bottom-2 -left-2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full border border-white/40 flex items-center justify-center animate-bounce"
                                style={{ animationDelay: "0.5s" }}>
                                <Star className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
