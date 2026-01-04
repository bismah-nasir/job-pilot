"use client";

import {
    RiGithubFill,
    RiLinkedinFill,
    RiMailLine,
    RiMapPinLine,
    RiPhoneLine,
    RiTwitterFill,
    RiYoutubeFill,
} from "react-icons/ri";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-app-gray-900 dark:bg-app-black text-app-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/images/logo.png"
                                alt="JobPilot Logo"
                                width={40}
                                height={40}
                                className="rounded-md"
                            />
                            <span className="text-2xl font-bold bg-linear-to-r from-app-purple-400 to-app-purple-600 bg-clip-text text-transparent">
                                JobPilot
                            </span>
                        </div>
                        <p className="text-app-gray-400 mb-6 max-w-md">
                            Empowering candidates with AI-driven interview
                            preparation and helping interviewers make smarter
                            hiring decisions through advanced collaboration
                            tools.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-app-gray-400 hover:text-app-purple-400 transition-colors cursor-pointer">
                                <RiTwitterFill className="text-2xl w-6 h-6 flex items-center justify-center"></RiTwitterFill>
                            </a>
                            <a
                                href="#"
                                className="text-app-gray-400 hover:text-app-purple-400 transition-colors cursor-pointer">
                                <RiLinkedinFill className="text-2xl w-6 h-6 flex items-center justify-center"></RiLinkedinFill>
                            </a>
                            <a
                                href="#"
                                className="text-app-gray-400 hover:text-app-purple-400 transition-colors cursor-pointer">
                                <RiGithubFill className="text-2xl w-6 h-6 flex items-center justify-center"></RiGithubFill>
                            </a>
                            <a
                                href="#"
                                className="text-app-gray-400 hover:text-app-purple-400 transition-colors cursor-pointer">
                                <RiYoutubeFill className="text-2xl w-6 h-6 flex items-center justify-center"></RiYoutubeFill>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-app-gray-400 hover:text-app-white transition-colors cursor-pointer">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="text-app-gray-400 hover:text-app-white transition-colors cursor-pointer">
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#products"
                                    className="text-app-gray-400 hover:text-app-white transition-colors cursor-pointer">
                                    Products
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#how-it-works"
                                    className="text-app-gray-400 hover:text-app-white transition-colors cursor-pointer">
                                    How It Works
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-app-gray-400 hover:text-app-white transition-colors cursor-pointer">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li className="text-app-gray-400">
                                <RiMailLine className="w-4 h-4 inline-flex items-center justify-center mr-2"></RiMailLine>
                                support@jobpilot.com
                            </li>
                            <li className="text-app-gray-400">
                                <RiPhoneLine className="w-4 h-4 inline-flex items-center justify-center mr-2"></RiPhoneLine>
                                021 1234 5678
                            </li>
                            <li className="text-app-gray-400">
                                <RiMapPinLine className="w-4 h-4 inline-flex items-center justify-center mr-2"></RiMapPinLine>
                                Karachi, PK
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-app-gray-800 mt-8 pt-8 text-center">
                    <p className="text-app-gray-400">
                        © 2025 JobPilot. All rights reserved. Built with ❤️ for
                        better hiring.
                    </p>
                </div>
            </div>
        </footer>
    );
}
