import { calculateRecordingDuration } from "@/lib/utils";
import { CallRecording } from "@stream-io/video-react-sdk";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { CalendarIcon, ClockIcon, CopyIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";

function RecordingCard({ recording }: { recording: CallRecording }) {
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(recording.url);
            toast.success("Recording link copied to clipboard");
        } catch (error) {
            toast.error("Failed to copy link to clipboard");
        }
    };

    const formattedStartTime = recording.start_time
        ? format(new Date(recording.start_time), "MMM d, yyyy, hh:mm a")
        : "Unknown";

    const duration =
        recording.start_time && recording.end_time
            ? calculateRecordingDuration(
                  recording.start_time,
                  recording.end_time
              )
            : "Unknown duration";

    // return (
    //     <Card className="group hover:shadow-md transition-all">
    //         {/* Card Header */}
    //         <CardHeader className="space-y-1">
    //             <div className="space-y-2">
    //                 <div className="flex flex-col gap-1.5">
    //                     <div className="flex items-center text-sm text-muted-foreground gap-2">
    //                         <CalendarIcon className="h-3.5 w-3.5" />
    //                         <span>{formattedStartTime}</span>
    //                     </div>
    //                     <div className="flex items-center text-sm text-muted-foreground gap-2">
    //                         <ClockIcon className="h-3.5 w-3.5" />
    //                         <span>{duration}</span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </CardHeader>

    //         {/* Card Content */}
    //         <CardContent>
    //             <div
    //                 className="w-full aspect-video bg-muted/50 rounded-lg flex items-center justify-center cursor-pointer group"
    //                 onClick={() => window.open(recording.url, "_blank")}>
    //                 <div className="size-12 rounded-full bg-background/90 flex items-center justify-center group-hover:bg-primary transition-colors">
    //                     <PlayIcon className="size-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
    //                 </div>
    //             </div>
    //         </CardContent>
    //         <CardFooter className="gap-2">
    //             <Button
    //                 className="flex-1"
    //                 onClick={() => window.open(recording.url, "_blank")}>
    //                 <PlayIcon className="size-4 mr-2" />
    //                 Play Recording
    //             </Button>
    //             <Button variant="secondary" onClick={handleCopyLink}>
    //                 <CopyIcon className="size-4" />
    //             </Button>
    //         </CardFooter>
    //     </Card>
    // );

    // return (
    //     <Card className="group hover:shadow-md transition-all bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
    //         {/* Card Header */}
    //         <CardHeader className="space-y-1 p-4 pb-2">
    //             <div className="space-y-2">
    //                 <div className="flex flex-col gap-1.5">
    //                     <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
    //                         <CalendarIcon className="h-3.5 w-3.5" />
    //                         <span>{formattedStartTime}</span>
    //                     </div>
    //                     <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
    //                         <ClockIcon className="h-3.5 w-3.5" />
    //                         <span>{duration}</span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </CardHeader>

    //         {/* Card Content (Thumbnail) */}
    //         <CardContent className="p-4 py-2">
    //             <div
    //                 className="w-full aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer group/thumbnail relative overflow-hidden border border-gray-200 dark:border-gray-700"
    //                 onClick={() => window.open(recording.url, "_blank")}>
    //                 {/* Hover Gradient Overlay */}
    //                 <div className="absolute inset-0 bg-black/0 group-hover/thumbnail:bg-black/10 transition-colors duration-300" />

    //                 {/* Play Button Circle */}
    //                 <div className="size-12 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center shadow-sm group-hover/thumbnail:bg-purple-600 group-hover/thumbnail:scale-110 transition-all duration-300 z-10">
    //                     <PlayIcon className="size-6 text-gray-500 dark:text-gray-400 group-hover/thumbnail:text-white transition-colors ml-0.5" />
    //                 </div>
    //             </div>
    //         </CardContent>

    //         {/* Card Footer */}
    //         <CardFooter className="gap-2 p-4 pt-2">
    //             <Button
    //                 className="flex-1 bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all"
    //                 onClick={() => window.open(recording.url, "_blank")}>
    //                 <PlayIcon className="size-4 mr-2" />
    //                 Play Recording
    //             </Button>
    //             <Button
    //                 variant="secondary"
    //                 onClick={handleCopyLink}
    //                 className="hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all">
    //                 <CopyIcon className="size-4 text-gray-600 dark:text-gray-300" />
    //             </Button>
    //         </CardFooter>
    //     </Card>
    // );

    return (
        <Card className="group hover:shadow-md transition-all bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            {/* Card Header - Reduced padding */}
            <CardHeader className="space-y-1 p-3">
                <div className="space-y-2">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            <span>{formattedStartTime}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                            <ClockIcon className="h-3.5 w-3.5" />
                            <span>{duration}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            {/* Card Content (Thumbnail) - Tightened spacing */}
            <CardContent className="p-3 pt-0">
                <div
                    className="w-full aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer group/thumbnail relative overflow-hidden border border-gray-200 dark:border-gray-700"
                    onClick={() => window.open(recording.url, "_blank")}>
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover/thumbnail:bg-black/10 transition-colors duration-300" />

                    {/* Play Button Circle */}
                    {/* Fixed: Added dark:group-hover to ensure it turns purple in dark mode too */}
                    <div
                        className="size-12 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center shadow-sm 
                    group-hover/thumbnail:bg-purple-600 
                    dark:group-hover/thumbnail:bg-purple-600 
                    group-hover/thumbnail:scale-110 transition-all duration-300 z-10">
                        <PlayIcon className="size-6 text-gray-500 dark:text-gray-400 group-hover/thumbnail:text-white transition-colors ml-0.5" />
                    </div>
                </div>
            </CardContent>

            {/* Card Footer - Reduced padding */}
            <CardFooter className="gap-2 p-3 pt-0">
                <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all"
                    onClick={() => window.open(recording.url, "_blank")}>
                    <PlayIcon className="size-4 mr-2" />
                    Play Recording
                </Button>

                {/* Copy Button - Updated Colors for visibility */}
                <Button
                    variant="secondary"
                    onClick={handleCopyLink}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 
                           dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 
                           border border-transparent transition-all">
                    <CopyIcon className="size-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}

export default RecordingCard;
