"use client";

import Link from "next/link";
import {
    Sparkles,
    Mic,
    BarChart2,
    RefreshCw,
    Target,
    Bot,
    Lightbulb,
    Star,
    ArrowRight,
} from "lucide-react";

export default function MockInterviewBanner() {
    return (
        <div className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-app-purple-600 via-app-purple-500 to-app-purple-700 dark:from-app-purple-700 dark:via-app-purple-600 dark:to-app-purple-800 shadow-xl transition-all hover:shadow-app-purple-500/20 mb-10">
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-app-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-app-purple-500/20 blur-3xl"></div>

            <div className="relative px-8 py-8 md:px-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left: Text Content */}
                    <div className="flex-1 text-app-white max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-app-white/10 border border-app-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
                            <Sparkles className="h-3.5 w-3.5 text-app-yellow-300" />
                            AI-Powered Preparation
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl font-extrabold mb-4 leading-tight tracking-tight">
                            Master Your Next{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-app-purple-200 to-app-purple-100">
                                Tech Interview
                            </span>
                        </h2>

                        {/* Subheading */}
                        <p className="text-purple-100 text-base mb-6 leading-relaxed">
                            Practice with AI, get instant feedback, and
                            interview with confidence.
                        </p>

                        {/* Primary Action Button */}
                        <Link href="/interview-platform/ai-prep">
                            <button className="group relative inline-flex items-center justify-center gap-2 px-10 py-2 text-sm font-bold text-app-purple-700 bg-app-white rounded-lg shadow-lg transition-all duration-300 hover:bg-app-purple-50 hover:scale-[1.02] hover:shadow-xl focus:outline-none">
                                Practice Now
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </Link>
                    </div>

                    {/* Right: Visual Illustration */}
                    <div className="relative shrink-0 lg:mr-8">
                        <div className="relative w-36 h-36 lg:w-44 lg:h-44">
                            {/* Orbit Rings */}
                            <div className="absolute inset-0 rounded-full border border-app-white/10 scale-150 opacity-30"></div>
                            <div className="absolute inset-0 rounded-full border border-app-white/20 scale-125 opacity-40"></div>

                            {/* Glowing Pulse */}
                            <div className="absolute inset-0 bg-app-white/20 rounded-full blur-3xl animate-pulse"></div>

                            {/* Main Circle (Glass Effect) */}
                            <div className="relative w-full h-full bg-linear-to-b from-app-white/10 to-app-white/5 backdrop-blur-xl rounded-full border border-app-white/20 flex items-center justify-center shadow-2xl">
                                <Bot className="h-20 w-20 text-app-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            </div>

                            {/* Floating Badges */}
                            <div className="absolute -top-4 -right-4 bg-app-white/10 backdrop-blur-md border border-app-white/20 p-3 rounded-2xl shadow-lg animate-bounce duration-3000">
                                <Lightbulb className="h-4 w-4 text-app-yellow-300 fill-app-yellow-300/20" />
                            </div>

                            <div className="absolute -bottom-8 -left-2 bg-app-white/10 backdrop-blur-md border border-app-white/20 p-3 rounded-2xl shadow-lg animate-bounce duration-4000 delay-700">
                                <Star className="h-4 w-4 text-app-purple-200 fill-app-purple-200/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
