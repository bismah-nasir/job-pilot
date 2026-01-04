"use client";

import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NavBar() {
    const router = useRouter();

    const goToApp = () => {
        router.push("/interview-platform");
    };

    return (
        <nav className="w-full bg-app-white/80 dark:bg-app-gray-900/80 backdrop-blur-md border-b border-app-gray-200 dark:border-app-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Image
                            src="/images/logo.png"
                            alt="JobPilot Logo"
                            width={40}
                            height={40}
                            className="rounded-md"
                            priority
                        />
                        <span className="text-2xl font-bold bg-linear-to-r from-app-purple-600 to-app-purple-800 bg-clip-text text-transparent">
                            JobPilot
                        </span>
                    </div>

                    {/* Right side - Theme toggle and buttons */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle Button */}
                        <ModeToggle />

                        {/* Sign In as Interviewer Button */}
                        <button
                            onClick={goToApp}
                            className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105 border-2 border-app-purple-600 text-app-purple-600 hover:bg-app-purple-600 hover:text-app-white px-4 py-2 text-sm">
                            Sign In as Interviewer
                        </button>

                        {/* Sign In as Candidate Button */}
                        <button
                            onClick={goToApp}
                            className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer hover:scale-105 border-2 border-app-purple-600 bg-app-purple-600 hover:bg-app-purple-700 hover:border-app-purple-700 text-app-white shadow-lg hover:shadow-xl px-4 py-2 text-sm">
                            Sign In as Candidate
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
