import useMeetingActions from "@/hooks/useMeetingActions";
import { Doc } from "../../convex/_generated/dataModel";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { CalendarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Interview = Doc<"interviews">;

function MeetingCard({ interview }: { interview: Interview }) {
    const { joinMeeting } = useMeetingActions();

    const status = getMeetingStatus(interview);
    const formattedDate = format(
        new Date(interview.startTime),
        "EEEE, MMMM d · h:mm a"
    );

    // return (
    //     <Card className="p-0 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:border-purple-300 dark:hover:border-purple-600 transition-all shadow-none">
    //         <CardHeader className="space-y-2 p-5">
    //             <div className="flex items-center justify-between">
    //                 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
    //                     {" "}
    //                     <CalendarIcon className="h-4 w-4" />
    //                     {formattedDate}
    //                 </div>

    //                 <Badge
    //                     variant={
    //                         status === "live"
    //                             ? "default"
    //                             : status === "upcoming"
    //                               ? "secondary"
    //                               : "outline"
    //                     }>
    //                     {status === "live"
    //                         ? "Live Now"
    //                         : status === "upcoming"
    //                           ? "Upcoming"
    //                           : "Completed"}
    //                 </Badge>
    //             </div>

    //             <CardTitle>{interview.title}</CardTitle>

    //             {interview.description && (
    //                 <CardDescription className="line-clamp-2">
    //                     {interview.description}
    //                 </CardDescription>
    //             )}
    //         </CardHeader>

    //         <CardContent>
    //             {status === "live" && (
    //                 <Button
    //                     className="w-full"
    //                     onClick={() => joinMeeting(interview.streamCallId)}>
    //                     Join Meeting
    //                 </Button>
    //             )}

    //             {status === "upcoming" && (
    //                 <Button variant="outline" className="w-full" disabled>
    //                     Waiting to Start
    //                 </Button>
    //             )}
    //         </CardContent>
    //     </Card>
    // );

    return (
        <Card className="p-0 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:border-purple-300 dark:hover:border-purple-600 transition-all shadow-none">
            <CardHeader className="space-y-2 p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4" />
                        {formattedDate}
                    </div>

                    <Badge
                        variant={
                            status === "live"
                                ? "default"
                                : status === "upcoming"
                                  ? "secondary"
                                  : "outline"
                        }
                        className={`rounded-full text-xs font-medium px-3 py-1 capitalize 
                            ${
                                status === "live"
                                    ? "bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700 animate-pulse border-none shadow-none"
                                    : status === "upcoming"
                                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-100 hover:text-purple-700 border-none shadow-none"
                                      : "text-gray-500 bg-gray-100 dark:bg-gray-800 border-none shadow-none"
                            }
                        `}>
                        {status === "live"
                            ? "Live Now"
                            : status === "upcoming"
                              ? "Upcoming"
                              : "Completed"}
                    </Badge>
                </div>

                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    {interview.title}
                </CardTitle>

                {interview.description && (
                    <CardDescription className="line-clamp-2 text-gray-600 dark:text-gray-400">
                        {interview.description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent className="p-5 pt-0">
                {status === "live" && (
                    <Button
                        className="w-full bg-purple-600 text-white hover:bg-purple-700 shadow-sm hover:shadow-md transition-all"
                        onClick={() => joinMeeting(interview.streamCallId)}>
                        Join Meeting
                    </Button>
                )}

                {status === "upcoming" && (
                    <Button
                        variant="outline"
                        className="w-full bg-gray-100 dark:bg-gray-800 text-gray-500 border-none cursor-not-allowed hover:bg-gray-100"
                        disabled>
                        Waiting to Start
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
export default MeetingCard;
