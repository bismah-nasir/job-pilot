"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
    className,
    ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
    return (
        <SwitchPrimitive.Root
            data-slot="switch"
            className={cn(
                // ROOT (TRACK) STYLES
                "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                // Active State (Purple)
                "data-[state=checked]:bg-primary",
                // Inactive State (Gray) - This ensures contrast with the white thumb
                "data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700",
                className
            )}
            {...props}>
            <SwitchPrimitive.Thumb
                data-slot="switch-thumb"
                className={cn(
                    // THUMB (CIRCLE) STYLES
                    // 1. Force 'bg-white' so it is always a white circle
                    // 2. Added 'shadow-sm' for depth
                    "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-1"
                )}
            />
        </SwitchPrimitive.Root>
    );
}

export { Switch };
