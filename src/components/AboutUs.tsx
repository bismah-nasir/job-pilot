"use client";

import { RiBrainLine } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";
import { RiShieldCheckLine } from "react-icons/ri";

import Image from "next/image";

export default function AboutUs() {
    return (
        <section id="about" className="py-20 bg-app-white dark:bg-app-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-app-gray-900 dark:text-app-white mb-6">
                        About Our Platform
                    </h2>
                    <p className="text-xl text-app-gray-600 dark:text-app-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Bridging the gap between talent and opportunity through
                        innovative AI technology
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-app-gray-900 dark:text-app-white mb-4">
                                Our Mission
                            </h3>
                            <p className="text-lg text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                                We believe that every candidate deserves the
                                opportunity to showcase their true potential,
                                and every interviewer should have the tools to
                                make informed hiring decisions. Our platform
                                combines cutting-edge AI technology with
                                intuitive design to create a seamless interview
                                experience.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-app-gray-900 dark:text-app-white mb-4">
                                What We Offer
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="shrink-0 w-8 h-8 bg-app-purple-100 dark:bg-app-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                                        <RiBrainLine className="text-app-purple-600 w-5 h-5 flex items-center justify-center"></RiBrainLine>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-app-gray-900 dark:text-app-white mb-1">
                                            AI-Powered Preparation
                                        </h4>
                                        <p className="text-app-gray-600 dark:text-app-gray-300">
                                            Advanced algorithms provide
                                            personalized feedback and insights
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="shrink-0 w-8 h-8 bg-app-purple-100 dark:bg-app-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                                        <RiTeamLine className="text-app-purple-600 w-5 h-5 flex items-center justify-center"></RiTeamLine>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-app-gray-900 dark:text-app-white mb-1">
                                            Collaborative Tools
                                        </h4>
                                        <p className="text-app-gray-600 dark:text-app-gray-300">
                                            Real-time collaboration features for
                                            better evaluation
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="shrink-0 w-8 h-8 bg-app-purple-100 dark:bg-app-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                                        <RiShieldCheckLine className="text-app-purple-600 w-5 h-5 flex items-center justify-center"></RiShieldCheckLine>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-app-gray-900 dark:text-app-white mb-1">
                                            Secure Platform
                                        </h4>
                                        <p className="text-app-gray-600 dark:text-app-gray-300">
                                            Enterprise-grade security for all
                                            your interview data
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={"/images/office.jpg"}
                                alt="Modern collaborative workspace"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-app-white dark:bg-app-gray-800 rounded-2xl shadow-xl p-6 border border-app-gray-100 dark:border-app-gray-700">
                            <div className="text-3xl font-bold text-app-purple-600 mb-1">
                                10K+
                            </div>
                            <div className="text-sm text-app-gray-600 dark:text-app-gray-300">
                                Successful Interviews
                            </div>
                        </div>
                        <div className="absolute -top-6 -right-6 bg-app-white dark:bg-app-gray-800 rounded-2xl shadow-xl p-6 border border-app-gray-100 dark:border-app-gray-700">
                            <div className="text-3xl font-bold text-app-purple-600 mb-1">
                                95%
                            </div>
                            <div className="text-sm text-app-gray-600 dark:text-app-gray-300">
                                Success Rate
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
