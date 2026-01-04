"use client";

import {
    RiBriefcaseLine,
    RiCodeBoxLine,
    RiLineChartLine,
    RiRobotLine,
    RiSettings3Line,
    RiStarLine,
    RiTeamLine,
    RiUserAddLine,
    RiUserLine,
} from "react-icons/ri";

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-app-white dark:bg-app-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-app-gray-900 dark:text-app-white mb-6">
                        How It Works
                    </h2>
                    <p className="text-xl text-app-gray-600 dark:text-app-gray-300 max-w-3xl mx-auto">
                        Simple steps to transform your interview experience
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center px-6 py-3 rounded-full bg-app-purple-100 dark:bg-app-purple-900/30 text-app-purple-800 dark:text-app-purple-300 font-semibold mb-4">
                                <RiUserLine className="w-5 h-5 flex items-center justify-center mr-2"></RiUserLine>
                                For Candidates
                            </div>
                            <h3 className="text-2xl font-bold text-app-gray-900 dark:text-app-white">
                                Master Your Interview Skills
                            </h3>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-linear-to-r from-app-purple-500 to-app-purple-600 rounded-full flex items-center justify-center text-app-white font-bold text-lg shadow-lg">
                                        1
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <RiUserAddLine className="text-app-purple-600 text-xl w-6 h-6 flex items-center justify-center mr-3"></RiUserAddLine>
                                        <h4 className="text-xl font-semibold text-app-gray-900 dark:text-app-white">
                                            Sign Up
                                        </h4>
                                    </div>
                                    <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                                        Create your candidate profile and set
                                        your preferences
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-linear-to-r from-app-purple-500 to-app-purple-600 rounded-full flex items-center justify-center text-app-white font-bold text-lg shadow-lg">
                                        2
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <RiSettings3Line className="text-app-purple-600 text-xl w-6 h-6 flex items-center justify-center mr-3"></RiSettings3Line>
                                        <h4 className="text-xl font-semibold text-app-gray-900 dark:text-app-white">
                                            Customize
                                        </h4>
                                    </div>
                                    <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                                        Choose your field, experience level, and
                                        interview goals
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-linear-to-r from-app-purple-500 to-app-purple-600 rounded-full flex items-center justify-center text-app-white font-bold text-lg shadow-lg">
                                        3
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <RiRobotLine className="text-app-purple-600 text-xl w-6 h-6 flex items-center justify-center mr-3"></RiRobotLine>
                                        <h4 className="text-xl font-semibold text-app-gray-900 dark:text-app-white">
                                            Practice
                                        </h4>
                                    </div>
                                    <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                                        Start AI-powered mock interviews
                                        tailored to your needs
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-linear-to-r from-app-purple-500 to-app-purple-600 rounded-full flex items-center justify-center text-app-white font-bold text-lg shadow-lg">
                                        4
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <RiLineChartLine className="text-app-purple-600 text-xl w-6 h-6 flex items-center justify-center mr-3"></RiLineChartLine>
                                        <h4 className="text-xl font-semibold text-app-gray-900 dark:text-app-white">
                                            Improve
                                        </h4>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Get detailed feedback and track your
                                        progress over time
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center px-6 py-3 rounded-full bg-app-blue-100 dark:bg-app-blue-900/30 text-app-blue-800 dark:text-app-blue-300 font-semibold mb-4">
                                <RiBriefcaseLine className="w-5 h-5 flex items-center justify-center mr-2"></RiBriefcaseLine>
                                For Interviewers
                            </div>
                            <h3 className="text-2xl font-bold text-app-gray-900 dark:text-app-white">
                                Streamline Your Hiring Process
                            </h3>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-linear-to-r from-app-blue-500 to-app-blue-600 rounded-full flex items-center justify-center text-app-white font-bold text-lg shadow-lg">
                                        1
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <RiUserAddLine className="text-app-blue-600 text-xl w-6 h-6 flex items-center justify-center mr-3"></RiUserAddLine>
                                        <h4 className="text-xl font-semibold text-app-gray-900 dark:text-app-white">
                                            Set Up
                                        </h4>
                                    </div>
                                    <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                                        Create interviewer account and configure
                                        your hiring needs
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-linear-to-r from-app-blue-500 to-app-blue-600 rounded-full flex items-center justify-center text-app-white font-bold text-lg shadow-lg">
                                        2
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <RiTeamLine className="text-app-blue-600 text-xl w-6 h-6 flex items-center justify-center mr-3"></RiTeamLine>
                                        <h4 className="text-xl font-semibold text-app-gray-900 dark:text-app-white">
                                            Invite
                                        </h4>
                                    </div>
                                    <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                                        Add team members and set up
                                        collaborative evaluation
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-linear-to-r from-app-blue-500 to-app-blue-600 rounded-full flex items-center justify-center text-app-white font-bold text-lg shadow-lg">
                                        3
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <RiCodeBoxLine className="text-app-blue-600 text-xl w-6 h-6 flex items-center justify-center mr-3"></RiCodeBoxLine>
                                        <h4 className="text-xl font-semibold text-app-gray-900 dark:text-app-white">
                                            Interview
                                        </h4>
                                    </div>
                                    <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                                        Conduct live coding sessions with
                                        real-time collaboration
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="shrink-0 mr-6">
                                    <div className="w-12 h-12 bg-linear-to-r from-app-blue-500 to-app-blue-600 rounded-full flex items-center justify-center text-app-white font-bold text-lg shadow-lg">
                                        4
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <RiStarLine className="text-app-blue-600 text-xl w-6 h-6 flex items-center justify-center mr-3"></RiStarLine>
                                        <h4 className="text-xl font-semibold text-app-gray-900 dark:text-app-white">
                                            Evaluate
                                        </h4>
                                    </div>
                                    <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                                        Use AI-assisted scoring and make
                                        informed hiring decisions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
