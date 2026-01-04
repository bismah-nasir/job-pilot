"use client";

import {
    RiCheckDoubleLine,
    RiCustomerService2Line,
    RiBriefcaseLine,
    RiMoneyDollarCircleLine,
    RiShieldCheckLine,
    RiUserLine,
} from "react-icons/ri";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Banner() {
    const router = useRouter();

    const goToApp = () => {
        router.push("/interview-platform");
    };

    return (
        <section className="py-20 bg-linear-to-r from-app-purple-600 via-app-purple-700 to-app-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <Image
                    src={"/images/banner-background.jpg"}
                    alt="AI neural network background"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-64 h-64 bg-app-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-app-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold text-app-white mb-6 leading-tight md:leading-none">
                        Ready to Transform Your
                        <span className="block bg-linear-to-r from-app-yellow-300 to-app-orange-300 bg-clip-text text-transparent">
                            Interview Experience?
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-app-purple-100 mb-12 max-w-3xl mx-auto">
                        Join thousands of candidates and interviewers who have
                        already discovered the power of AI-driven interview
                        preparation and collaborative hiring tools.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                        <button
                            onClick={goToApp}
                            className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105 border-2 bg-app-white text-app-purple-600 border-app-white hover:bg-app-gray-100 hover:text-app-purple-700 hover:border-app-gray-100 hover:shadow-xl text-lg px-12 py-4 shadow-2xl ">
                            <RiUserLine className="w-5 h-5 flex items-center justify-center mr-3"></RiUserLine>
                            Get Started as Candidate
                        </button>
                        <button
                            onClick={goToApp}
                            className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105 border-2 text-app-white border-app-white hover:bg-app-white hover:text-app-purple-700 text-lg px-12 py-4 ">
                            <RiBriefcaseLine className="w-5 h-5 flex items-center justify-center mr-3"></RiBriefcaseLine>
                            Get Started as Interviewer
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 text-app-purple-200">
                        <div className="flex items-center">
                            <RiCheckDoubleLine className="w-5 h-5 flex items-center justify-center mr-2"></RiCheckDoubleLine>
                            <span>Free Trial Available</span>
                        </div>
                        <div className="flex items-center">
                            <RiShieldCheckLine className="ri-shield-check-line w-5 h-5 flex items-center justify-center mr-2"></RiShieldCheckLine>
                            <span>Secure Platform</span>
                        </div>
                        <div className="flex items-center">
                            <RiCustomerService2Line className="ri-customer-service-2-line w-5 h-5 flex items-center justify-center mr-2"></RiCustomerService2Line>
                            <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center">
                            <RiMoneyDollarCircleLine className="ri-money-dollar-circle-line w-5 h-5 flex items-center justify-center mr-2"></RiMoneyDollarCircleLine>
                            <span>No Setup Fees</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
