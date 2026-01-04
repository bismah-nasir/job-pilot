"use client";

import { RiCheckLine, RiUserLine, RiBriefcaseLine } from "react-icons/ri";
import Image from "next/image";

export default function OurProducts() {
    return (
        <section
            id="products"
            className="py-20 bg-app-gray-50 dark:bg-app-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-app-gray-900 dark:text-app-white mb-6">
                        Our Products
                    </h2>
                    <p className="text-xl text-app-gray-600 dark:text-app-gray-300 max-w-3xl mx-auto">
                        Comprehensive solutions for both candidates and
                        interviewers
                    </p>
                </div>
                <div className="space-y-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-app-purple-100 dark:bg-app-purple-900/30 text-app-purple-800 dark:text-app-purple-300 text-sm font-medium mb-6">
                                <RiUserLine
                                    className="w-4 h-4 flex items-center justify-center mr-2"
                                    strokeWidth="0.5"></RiUserLine>
                                For Candidates
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-app-gray-900 dark:text-app-white mb-6">
                                AI Mock Interview Preparation
                            </h3>
                            <p className="text-lg text-app-gray-600 dark:text-app-gray-300 mb-8 leading-relaxed">
                                Master your interview skills with our advanced
                                AI-powered mock interview system. Get
                                personalized feedback, track your progress, and
                                build confidence for real interviews.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center">
                                    <div className="shrink-0 w-6 h-6 bg-app-green-100 dark:bg-app-green-900/30 rounded-full flex items-center justify-center mr-4">
                                        <RiCheckLine className="text-app-green-600 w-4 h-4 flex items-center justify-center"></RiCheckLine>
                                    </div>
                                    <span className="text-app-gray-700 dark:text-app-gray-300">
                                        AI-driven personalized questions based
                                        on your field
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="shrink-0 w-6 h-6 bg-app-green-100 dark:bg-app-green-900/30 rounded-full flex items-center justify-center mr-4">
                                        <RiCheckLine className="text-app-green-600 w-4 h-4 flex items-center justify-center"></RiCheckLine>
                                    </div>
                                    <span className="text-app-gray-700 dark:text-app-gray-300">
                                        Instant feedback on communication and
                                        technical skills
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="shrink-0 w-6 h-6 bg-app-green-100 dark:bg-app-green-900/30 rounded-full flex items-center justify-center mr-4">
                                        <RiCheckLine className="text-app-green-600 w-4 h-4 flex items-center justify-center"></RiCheckLine>
                                    </div>
                                    <span className="text-app-gray-700 dark:text-app-gray-300">
                                        Performance insights and improvement
                                        recommendations
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="shrink-0 w-6 h-6 bg-app-green-100 dark:bg-app-green-900/30 rounded-full flex items-center justify-center mr-4">
                                        <RiCheckLine className="text-app-green-600 w-4 h-4 flex items-center justify-center"></RiCheckLine>
                                    </div>
                                    <span className="text-app-gray-700 dark:text-app-gray-300">
                                        Practice with industry-specific
                                        scenarios
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={"/images/ai-mock-interview.jpg"}
                                        alt="AI Mock Interview Preparation"
                                        fill
                                        className="object-cover object-top"
                                        priority
                                    />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-app-white dark:bg-app-gray-800 rounded-xl shadow-lg p-4 border border-app-gray-100 dark:border-app-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-app-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-app-gray-700 dark:text-app-gray-300">
                                            AI Analyzing...
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="relative">
                                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={"/images/code-interview.jpg"}
                                        alt="Code Panel for Interviewers"
                                        fill
                                        className="object-cover object-top"
                                        priority
                                    />
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-app-white dark:bg-app-gray-800 rounded-xl shadow-lg p-4 border border-app-gray-100 dark:border-app-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-app-blue-400 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-app-gray-700 dark:text-app-gray-300">
                                            Live Session
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-app-blue-100 dark:bg-app-blue-900/30 text-app-blue-800 dark:text-app-blue-300 text-sm font-medium mb-6">
                                <RiBriefcaseLine
                                    className="w-4 h-4 flex items-center justify-center mr-2"
                                    strokeWidth="0.5"></RiBriefcaseLine>
                                For Interviewers
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-app-gray-900 dark:text-app-white mb-6">
                                Code Panel for Smart Hiring
                            </h3>
                            <p className="text-lg text-app-gray-600 dark:text-app-gray-300 mb-8 leading-relaxed">
                                Streamline your hiring process with our
                                collaborative code panel. Conduct live coding
                                sessions, evaluate candidates effectively, and
                                make data-driven hiring decisions.
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center">
                                    <div className="shrink-0 w-6 h-6 bg-app-green-100 dark:bg-app-green-900/30 rounded-full flex items-center justify-center mr-4">
                                        <RiCheckLine className="text-app-green-600 w-4 h-4 flex items-center justify-center"></RiCheckLine>
                                    </div>
                                    <span className="text-app-gray-700 dark:text-app-gray-300">
                                        Real-time collaborative coding
                                        environment
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="shrink-0 w-6 h-6 bg-app-green-100 dark:bg-app-green-900/30 rounded-full flex items-center justify-center mr-4">
                                        <RiCheckLine className="text-app-green-600 w-4 h-4 flex items-center justify-center"></RiCheckLine>
                                    </div>
                                    <span className="text-app-gray-700 dark:text-app-gray-300">
                                        Multi-interviewer evaluation and scoring
                                        system
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="shrink-0 w-6 h-6 bg-app-green-100 dark:bg-app-green-900/30 rounded-full flex items-center justify-center mr-4">
                                        <RiCheckLine className="text-app-green-600 w-4 h-4 flex items-center justify-center"></RiCheckLine>
                                    </div>
                                    <span className="text-app-gray-700 dark:text-app-gray-300">
                                        Advanced hiring tools and candidate
                                        tracking
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="shrink-0 w-6 h-6 bg-app-green-100 dark:bg-app-green-900/30 rounded-full flex items-center justify-center mr-4">
                                        <RiCheckLine className="text-app-green-600 w-4 h-4 flex items-center justify-center"></RiCheckLine>
                                    </div>
                                    <span className="text-app-gray-700 dark:text-app-gray-300">
                                        Integrated video calls and screen
                                        sharing
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
