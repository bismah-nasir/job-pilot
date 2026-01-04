"use client";

import { Button } from "@/components/ui/button";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { useTheme } from "next-themes";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const handleToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <Button
            onClick={handleToggle}
            className="!p-5 rounded-lg bg-app-gray-100 dark:bg-app-gray-800 hover:bg-app-gray-200 dark:hover:bg-app-gray-700 transition-colors cursor-pointer shadow relative"
            aria-label={
                theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }>
            <RiSunLine className="absolute !h-4.5 !w-4.5 transition-all duration-300 scale-0 rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100 text-app-yellow-300"></RiSunLine>
            <RiMoonLine className="absolute !h-4.5 !w-4.5 transition-all duration-300 scale-100 rotate-0 opacity-100 dark:scale-0 dark:rotate-90 dark:opacity-0 text-app-gray-600"></RiMoonLine>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
