import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DashboardBtn from "./DashboardBtn";
import Image from "next/image";

function AppNavbar() {
    return (
        <nav className="w-full bg-app-white/80 dark:bg-app-gray-900/80 backdrop-blur-md border-b border-app-gray-200 dark:border-app-gray-700 sticky top-0 z-50">
            <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Left Side => Logo */}
                <Link
                    href="/interview-platform"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
                </Link>

                {/* Right Side => Actions */}
                <SignedIn>
                    <div className="flex items-center space-x-4">
                        <DashboardBtn />
                        <ModeToggle />
                        <div className="scale-130 pt-1.5">
                            <UserButton />
                        </div>
                    </div>
                </SignedIn>
            </div>
        </nav>
    );
}

export default AppNavbar;
