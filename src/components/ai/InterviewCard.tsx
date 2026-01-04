import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Star, ArrowRight } from "lucide-react";
import DisplayTechIcons from "./DisplayTechIcons";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface InterviewCardProps {
    _id?: string;
    candidateId?: string;
    role: string;
    type: string;
    techstack: string[];
    _creationTime?: number;
    coverImage: string;
}

const InterviewCard = ({
    _id,
    candidateId,
    role,
    type,
    techstack,
    _creationTime,
    coverImage,
}: InterviewCardProps) => {
    let feedback = null;
    if (candidateId && _id) {
        feedback = useQuery(api.feedbacks.getFeedbackByInterviewId, {
            interviewId: _id,
        });
    }

    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(
        feedback?._creationTime || _creationTime || Date.now()
    ).format("MMM D, YYYY");

    return (
        <div className="relative rounded-3xl p-px bg-linear-to-br from-app-purple-400/30 via-app-purple-300/10 to-transparent dark:from-app-purple-500/30 dark:via-app-purple-400/10 dark:to-transparent">
            <div className="relative flex flex-col justify-between h-105 rounded-3xl p-6 border border-app-purple-300/30 dark:border-app-purple-300/20 bg-linear-to-br from-app-gray-50 via-app-gray-100 to-app-gray-50 dark:from-app-gray-900 dark:via-app-gray-950/50 dark:to-app-gray-900">
                {/* Type badge */}
                <div className="absolute top-4 right-4 rounded-lg px-4 py-1.5 bg-app-purple-400/90">
                    <p className="text-xs font-semibold text-app-gray-900 capitalize">
                        {normalizedType}
                    </p>
                </div>

                {/* Top Content */}
                <div>
                    {/* Cover Icon */}
                    <Image
                        src={coverImage}
                        alt="cover image"
                        width={72}
                        height={72}
                        className="rounded-full p-2 bg-app-gray-100 border border-app-purple-300/30 dark:bg-app-gray-800 dark:border-app-purple-300/30"
                    />

                    {/* Title */}
                    <h3 className="mt-6 text-2xl font-bold text-app-gray-900 dark:text-app-gray-50 capitalize">
                        {role} Interview
                    </h3>

                    {/* Meta */}
                    <div className="mt-4 flex items-center gap-6 text-sm text-app-gray-600 dark:text-app-gray-300">
                        <div className="flex items-center gap-2">
                            <div className="px-2 py-2 rounded-full bg-purple-900/60">
                            <Image
                                src="/images/calendar.svg"
                                alt="calendar"
                                width={18}
                                height={18}
                            />
                            </div>
                            <span>{formattedDate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="px-2 py-2 rounded-full bg-purple-900/60">
                            <Image
                                src="/images/star.svg"
                                alt="star"
                                width={18}
                                height={18}
                            />
                            </div>
                            <span>{feedback?.totalScore || "---"}/100</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="mt-5 text-sm leading-relaxed text-app-gray-600 dark:text-app-gray-300 line-clamp-3">
                        {feedback?.finalAssessment ||
                            "You haven't taken the interview yet. Take it now to improve your skills."}
                    </p>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between">
                    <DisplayTechIcons techStack={techstack} />

                    <Button className="rounded-full bg-app-purple-300 text-app-gray-900 hover:bg-app-purple-300/90 transition px-6 py-2.5 text-sm font-semibold">
                        <Link
                            href={
                                feedback
                                    ? `/interview-platform/ai-prep/interview/${_id}/feedback`
                                    : `/interview-platform/ai-prep/interview/${_id}`
                            }>
                            {feedback ? "Check Feedback" : "View Interview"}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );

    // return (
    //   <div
    //     className="
    //       relative rounded-3xl p-[1px]
    //       bg-gradient-to-br
    //       from-app-purple-400/30 via-app-purple-300/10 to-transparent
    //       dark:from-app-purple-500/30 dark:via-app-purple-400/10 dark:to-transparent
    //     "
    //   >
    //     <div
    //       className="
    //         relative flex flex-col justify-between h-[420px] rounded-3xl p-6
    //         border border-app-purple-300/30 dark:border-app-purple-300/20

    //         bg-gradient-to-br
    //         from-app-gray-50 via-app-gray-100 to-white
    //         dark:from-app-gray-900 dark:via-app-gray-950 dark:to-black
    //       "
    //     >
    //       {/* Type badge */}
    //       <div
    //         className="
    //           absolute top-4 right-4 rounded-lg px-4 py-1.5
    //           bg-app-purple-400/90 dark:bg-app-purple-400/90
    //         "
    //       >
    //         <p
    //           className="
    //             text-xs font-semibold capitalize
    //             text-app-gray-900 dark:text-app-gray-900
    //           "
    //         >
    //           {normalizedType}
    //         </p>
    //       </div>

    //       {/* Top Content */}
    //       <div>
    //         {/* Cover Icon */}
    //         <Image
    //           src={coverImage}
    //           alt="cover image"
    //           width={72}
    //           height={72}
    //           className="
    //             rounded-full p-2
    //             bg-app-gray-100 border border-app-purple-300/30
    //             dark:bg-app-gray-800 dark:border-app-purple-300/30
    //           "
    //         />

    //         {/* Title */}
    //         <h3
    //           className="
    //             mt-6 text-2xl font-bold capitalize
    //             text-app-gray-900 dark:text-app-gray-50
    //           "
    //         >
    //           {role} Interview
    //         </h3>

    //         {/* Meta */}
    //         <div
    //           className="
    //             mt-4 flex items-center gap-6 text-sm
    //             text-app-gray-600 dark:text-app-gray-300
    //           "
    //         >
    //           <div className="flex items-center gap-2">
    //             <Image src="/calendar.svg" alt="calendar" width={18} height={18} />
    //             <span>{formattedDate}</span>
    //           </div>

    //           <div className="flex items-center gap-2">
    //             <Image src="/star.svg" alt="star" width={18} height={18} />
    //             <span>{feedback?.totalScore || "---"}/100</span>
    //           </div>
    //         </div>

    //         {/* Description */}
    //         <p
    //           className="
    //             mt-5 text-sm leading-relaxed line-clamp-3
    //             text-app-gray-600 dark:text-app-gray-300
    //           "
    //         >
    //           {feedback?.finalAssessment ||
    //             "You haven't taken the interview yet. Take it now to improve your skills."}
    //         </p>
    //       </div>

    //       {/* Bottom Row */}
    //       <div className="flex items-center justify-between">
    //         <DisplayTechIcons techStack={techstack} />

    //         <Button
    //           className="
    //             rounded-full px-6 py-2.5 text-sm font-semibold transition
    //             bg-app-purple-300 text-app-gray-900
    //             hover:bg-app-purple-300/90
    //             dark:bg-app-purple-300 dark:text-app-gray-900 dark:hover:bg-app-purple-300/90
    //           "
    //         >
    //           <Link
    //             href={
    //               feedback
    //                 ? `/interview/${id}/feedback`
    //                 : `/interview/${id}`
    //             }
    //           >
    //             {feedback ? "Check Feedback" : "View Interview"}
    //           </Link>
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // );
};

export default InterviewCard;
