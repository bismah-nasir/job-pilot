import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import InterviewListing from "@/components/ai/InterviewListing";

const Page = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {/* HERO SECTION */}
            <section className="relative flex flex-row items-center justify-between px-8 py-6 md:px-12 md:py-10 overflow-hidden rounded-3xl bg-linear-to-b from-app-purple-800/80 via-app-purple-500/70 to-app-purple-200 dark:from-app-purple-900/90 dark:via-app-purple-700/50 dark:to-app-purple-900/10 shadow-xl">
                {/* Soft Glow */}

                <div className="flex flex-col gap-6 max-w-lg z-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-app-white leading-tight">
                        Get Interview-Ready with AI-Powered Practice & Feedback
                    </h2>

                    <p className="text-lg text-app-purple-50">
                        Practice on real interview questions & get instant
                        feedback
                    </p>

                    <Button
                        asChild
                        className="w-fit bg-app-white text-app-purple-800 hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg rounded-4xl font-bold px-8 py-5 text-sm">
                        <Link
                            href="/interview-platform/ai-prep/interview"
                            className="flex items-center gap-2">
                            Create an Interview
                        </Link>
                    </Button>
                </div>

                <div className="relative hidden md:block">
                    <div className="absolute inset-0 bg-app-purple-400/20 blur-2xl rounded-full"></div>
                    <Image
                        src="/images/robot.png"
                        alt="robo-dude"
                        width={350}
                        height={350}
                        className="relative z-10 drop-shadow-2xl"
                    />
                </div>
            </section>

            {/* INTERVIEWS SECTION */}
            <InterviewListing />
        </div>
    );
};

export default Page;
