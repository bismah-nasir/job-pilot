"use client";

import {
    RiBrainLine,
    RiContrast2Line,
    RiGlobalLine,
    RiShieldCheckLine,
    RiSmartphoneLine,
    RiTimeLine,
} from "react-icons/ri";

export default function ChooseUs() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-app-gray-900 dark:text-app-white mb-6">
                        Why Choose JobPilot?
                    </h2>
                    <p className="text-xl text-app-gray-600 dark:text-app-gray-300 max-w-3xl mx-auto">
                        Discover the features that make our platform the
                        preferred choice for modern interview processes
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-app-white dark:bg-app-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-app-gray-100 dark:border-app-gray-700 hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-app-purple-100 dark:bg-app-purple-900/30 text-app-purple-600 rounded-2xl flex items-center justify-center mb-6">
                            <RiBrainLine className="text-2xl w-6 h-6 flex items-center justify-center"></RiBrainLine>
                        </div>
                        <h3 className="text-xl font-bold text-app-gray-900 dark:text-app-white mb-4">
                            AI-Powered Intelligence
                        </h3>
                        <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                            Advanced machine learning algorithms provide
                            personalized insights and recommendations for
                            optimal interview performance.
                        </p>
                    </div>
                    <div className="bg-app-white dark:bg-app-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-app-gray-100 dark:border-app-gray-700 hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-app-green-100 dark:bg-app-green-900/30 text-app-green-600 rounded-2xl flex items-center justify-center mb-6">
                            <RiShieldCheckLine className="text-2xl w-6 h-6 flex items-center justify-center"></RiShieldCheckLine>
                        </div>
                        <h3 className="text-xl font-bold text-app-gray-900 dark:text-app-white mb-4">
                            Secure Collaboration
                        </h3>
                        <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                            Enterprise-grade security ensures your interview
                            data and candidate information remain completely
                            protected.
                        </p>
                    </div>
                    <div className="bg-app-white dark:bg-app-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-app-gray-100 dark:border-app-gray-700 hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-app-blue-100 dark:bg-app-blue-900/30 text-app-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <RiSmartphoneLine className="text-2xl w-6 h-6 flex items-center justify-center"></RiSmartphoneLine>
                        </div>
                        <h3 className="text-xl font-bold text-app-gray-900 dark:text-app-white mb-4">
                            Ease of Use
                        </h3>
                        <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                            Intuitive interface designed for both technical and
                            non-technical users. Start interviewing in minutes,
                            not hours.
                        </p>
                    </div>
                    <div className="bg-app-white dark:bg-app-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-app-gray-100 dark:border-app-gray-700 hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-app-orange-100 dark:bg-app-orange-900/30 text-app-orange-600 rounded-2xl flex items-center justify-center mb-6">
                            <RiContrast2Line className="text-2xl w-6 h-6 flex items-center justify-center"></RiContrast2Line>
                        </div>
                        <h3 className="text-xl font-bold text-app-gray-900 dark:text-app-white mb-4">
                            Dark &amp; Light Mode
                        </h3>
                        <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                            Comfortable viewing experience with seamless theme
                            switching. Work effectively in any lighting
                            condition.
                        </p>
                    </div>
                    <div className="bg-app-white dark:bg-app-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-app-gray-100 dark:border-app-gray-700 hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-app-red-100 dark:bg-app-red-900/30 text-app-red-600 rounded-2xl flex items-center justify-center mb-6">
                            <RiTimeLine className="text-2xl w-6 h-6 flex items-center justify-center"></RiTimeLine>
                        </div>
                        <h3 className="text-xl font-bold text-app-gray-900 dark:text-app-white mb-4">
                            Real-Time Feedback
                        </h3>
                        <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                            Instant evaluation and scoring help candidates
                            improve immediately and interviewers make quick
                            decisions.
                        </p>
                    </div>
                    <div className="bg-app-white dark:bg-app-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-app-gray-100 dark:border-app-gray-700 hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-app-teal-100 dark:bg-app-teal-900/30 text-app-teal-600 rounded-2xl flex items-center justify-center mb-6">
                            <RiGlobalLine className="text-2xl w-6 h-6 flex items-center justify-center"></RiGlobalLine>
                        </div>
                        <h3 className="text-xl font-bold text-app-gray-900 dark:text-app-white mb-4">
                            Global Accessibility
                        </h3>
                        <p className="text-app-gray-600 dark:text-app-gray-300 leading-relaxed">
                            Cloud-based platform accessible from anywhere in the
                            world. Conduct interviews across time zones
                            effortlessly.
                        </p>
                    </div>
                </div>
                <div className="mt-20 bg-app-white dark:bg-app-gray-800 rounded-3xl p-12 shadow-xl border border-app-gray-100 dark:border-app-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-app-purple-600 mb-2">
                                10K+
                            </div>
                            <div className="text-app-gray-600 dark:text-app-gray-300">
                                Interviews Conducted
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-app-purple-600 mb-2">
                                95%
                            </div>
                            <div className="text-app-gray-600 dark:text-app-gray-300">
                                Success Rate
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-app-purple-600 mb-2">
                                500+
                            </div>
                            <div className="text-app-gray-600 dark:text-app-gray-300">
                                Companies Trust Us
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-app-purple-600 mb-2">
                                24/7
                            </div>
                            <div className="text-app-gray-600 dark:text-app-gray-300">
                                Platform Availability
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
