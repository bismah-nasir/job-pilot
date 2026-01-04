"use client";

import { RiSparklingLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { RiBriefcaseLine } from "react-icons/ri";
import { RiShieldCheckLine } from "react-icons/ri";
import { RiTimeLine } from "react-icons/ri";
import { RiRobotLine } from "react-icons/ri";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();

    const goToApp = () => {
        router.push("/interview-platform");
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-app-purple-50 via-app-white to-app-blue-50 dark:from-app-gray-900 dark:via-app-purple-900/20 dark:to-app-gray-900">
            {/* Background */}
            <div className="absolute inset-0 bg-cover bg-center opacity-10">
                <Image
                    src={"/images/background.jpg"}
                    alt="Hero background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-app-white/50 dark:bg-app-gray-900/50 opacity-5" />
            </div>

            {/* Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-app-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-app-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-r from-app-purple-200/10 to-app-blue-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* AI-Powered Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-app-purple-100 dark:bg-app-purple-900/30 text-app-purple-800 dark:text-app-purple-300 text-sm font-medium mb-8 border border-app-purple-200 dark:border-app-purple-700">
                        <RiSparklingLine className="w-4 h-4 flex items-center justify-center mr-2"></RiSparklingLine>
                        AI-Powered Interview Platform
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold text-app-gray-900 dark:text-app-white mb-6 leading-tight md:leading-none">
                        AI-Powered Interview
                        <span className="bg-linear-to-r from-app-purple-600 to-app-blue-600 bg-clip-text text-transparent block">
                            Preparation &amp; Code Panel
                        </span>
                        for Smarter Hiring
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-app-gray-600 dark:text-app-gray-300 mb-12 max-w-3xl mx-auto">
                        Revolutionize your interview experience with AI-driven
                        preparation for candidates and collaborative evaluation
                        tools for interviewers. Make every interview count.
                    </p>

                    {/* Call-to-Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <button
                            onClick={goToApp}
                            className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105 bg-app-purple-600 hover:bg-app-purple-700 text-app-white hover:shadow-xl text-lg px-12 py-4 shadow-2xl ">
                            <RiUserLine className="w-5 h-5 flex items-center justify-center mr-3"></RiUserLine>
                            Start as Candidate
                        </button>
                        <button
                            onClick={goToApp}
                            className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105 border-2 border-app-purple-600 text-app-purple-600 hover:bg-app-purple-600 hover:text-app-white text-lg px-12 py-4 ">
                            <RiBriefcaseLine className="w-5 h-5 flex items-center justify-center mr-3"></RiBriefcaseLine>
                            Start as Interviewer
                        </button>
                    </div>

                    {/* Feature Highlights */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-app-gray-500 dark:text-app-gray-400">
                        {/* Secure & Private */}
                        <div className="flex items-center">
                            <RiShieldCheckLine className="w-4 h-4 flex items-center justify-center mr-2 text-app-green-500"></RiShieldCheckLine>
                            <span>Secure &amp; Private</span>
                        </div>

                        {/* Real-time Feedback */}
                        <div className="flex items-center">
                            <RiTimeLine className="w-4 h-4 flex items-center justify-center mr-2 text-app-blue-500"></RiTimeLine>
                            <span>Real-time Feedback</span>
                        </div>

                        {/* AI-Powered */}
                        <div className="flex items-center">
                            <RiRobotLine className="w-4 h-4 flex items-center justify-center mr-2 text-app-purple-500"></RiRobotLine>
                            <span>AI-Powered</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
