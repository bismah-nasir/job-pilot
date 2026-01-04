import {
    CallControls,
    CallingState,
    CallParticipantsList,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutListIcon, LoaderIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import EndCallButton from "./EndCallButton";
import CodeEditor from "./CodeEditor";

function MeetingRoom() {
    const router = useRouter();

    const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
    const [showParticipants, setShowParticipants] = useState(false);
    const { useCallCallingState } = useCallStateHooks();

    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) {
        return (
            <div className="h-96 flex items-center justify-center">
                <LoaderIcon className="size-6 animate-spin" />
            </div>
        );
    }

    return (
        // 100vh(screen height) - 4rem(height of navbar) - 1px(border of navbar)
        <div className="h-[calc(100vh-4rem-1px)] bg-gray-50 dark:bg-gray-900">
            <ResizablePanelGroup direction="horizontal">
                {/* Left Hand Side */}
                <ResizablePanel
                    defaultSize={35}
                    minSize={25}
                    maxSize={100}
                    className="relative">
                    {/* Video Layout */}
                    <div className="absolute inset-0">
                        {layout === "grid" ? (
                            <PaginatedGridLayout />
                        ) : (
                            <SpeakerLayout />
                        )}

                        {/* Participants List Overlay*/}
                        {showParticipants && (
                            <div className="absolute right-0 top-0 h-full w-[300px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-l border-gray-200 dark:border-gray-700 shadow-xl z-20">
                                <CallParticipantsList
                                    onClose={() => setShowParticipants(false)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Video Controls */}

                    <div className="absolute bottom-4 left-0 right-0 z-10">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 flex-wrap justify-center px-4">
                                <CallControls
                                    onLeave={() => router.push("/interview-platform")}
                                />
                                <div className="flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="size-10 rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm">
                                                <LayoutListIcon className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="!bg-white dark:!bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                                            <DropdownMenuItem
                                                className="cursor-pointer hover:!bg-gray-100 dark:hover:!bg-gray-700"
                                                onClick={() =>
                                                    setLayout("grid")
                                                }>
                                                Grid View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="cursor-pointer hover:!bg-gray-100 dark:hover:!bg-gray-700"
                                                onClick={() =>
                                                    setLayout("speaker")
                                                }>
                                                Speaker View
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="size-10 rounded-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm"
                                        onClick={() =>
                                            setShowParticipants(
                                                !showParticipants
                                            )
                                        }>
                                        <UsersIcon className="h-4 w-4" />
                                    </Button>

                                    <EndCallButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </ResizablePanel>

                {/* Horizontal Handle */}
                <ResizableHandle
                    className="bg-gray-200 dark:bg-gray-700"
                    withHandle
                />

                {/* Right Hand Side */}
                <ResizablePanel defaultSize={65} minSize={25}>
                    <CodeEditor />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export default MeetingRoom;
