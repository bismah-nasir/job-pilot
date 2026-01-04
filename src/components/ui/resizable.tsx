"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

function ResizablePanelGroup({
    className,
    ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
    return (
        <ResizablePrimitive.PanelGroup
            data-slot="resizable-panel-group"
            className={cn(
                "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
                className
            )}
            {...props}
        />
    );
}

function ResizablePanel({
    ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
    return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
    withHandle,
    className,
    ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean;
}) {
    return (
        <ResizablePrimitive.PanelResizeHandle
            data-slot="resizable-handle"
            // className={cn(
            //   "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
            //   className
            // )}
            // {...props}
            className={cn(
                // Base Layout
                "relative flex w-px items-center justify-center transition-colors",

                // Touch Target (invisible wider area for easier grabbing)
                "after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2 after:z-50",

                // Colors: Base Gray -> Hover Purple
                "bg-gray-200 dark:bg-gray-800 hover:bg-purple-500 dark:hover:bg-purple-600",

                // Focus State
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:ring-offset-1",

                // Vertical Orientation Logic
                "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",

                className
            )}
            {...props}>
            {withHandle && (
                <div className="z-10 flex h-8 w-4 items-center justify-center rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm transition-all group-hover:border-purple-500">
                    <GripVerticalIcon className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-purple-500" />
                </div>
            )}
        </ResizablePrimitive.PanelResizeHandle>
    );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
