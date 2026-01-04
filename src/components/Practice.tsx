// Helper to get badge colors matching your reference snippet
// const getBadgeClassName = (categoryId: string) => {
//     switch (categoryId) {
//         case "upcoming":
//             return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
//         case "completed":
//             return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
//         case "succeeded":
//             return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
//         case "failed":
//             return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
//         default:
//             return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
//     }
// };

// return (
//     // CONTAINER: Updated to max-w-7xl and specific padding from snippet
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex items-center mb-8">
//             <Link href="/interview-platform/schedule">
//                 <Button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 shadow-sm hover:shadow-md transition-all whitespace-nowrap cursor-pointer">
//                     Schedule New Interview
//                 </Button>
//             </Link>
//         </div>

//         <div className="space-y-12">
//             {INTERVIEW_CATEGORY.map(
//                 (category) =>
//                     groupedInterviews[category.id]?.length > 0 && (
//                         <section key={category.id}>
//                             {/* Category Title & Badge */}
//                             <div className="flex items-center gap-3 mb-6">
//                                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                                     {category.title}
//                                 </h2>
//                                 <Badge
//                                     variant={category.variant}
//                                     className={`px-3 py-1 rounded-full text-sm font-medium hover:bg-opacity-100 ${getBadgeClassName(category.id)} shadow-none border-0`}
//                                 >
//                                     {groupedInterviews[category.id].length}
//                                 </Badge>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {groupedInterviews[category.id].map(
//                                     (interview: Interview) => {
//                                         const candidateInfo = getCandidateInfo(
//                                             users,
//                                             interview.candidateId
//                                         );
//                                         const startTime = new Date(
//                                             interview.startTime
//                                         );

//                                         return (
//                                             <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 p-2">
//                                                 {/* Candidate Info */}
//                                                 <CardHeader className="p-4">
//                                                     <div className="flex items-start gap-4">
//                                                         {/* Avatar: Increased to w-12 h-12 as per snippet */}
//                                                         <Avatar className="h-12 w-12 rounded-full">
//                                                             <AvatarImage
//                                                                 src={
//                                                                     candidateInfo.image
//                                                                 }
//                                                                 className="object-cover"
//                                                             />
//                                                             <AvatarFallback className="bg-purple-100 text-purple-700">
//                                                                 {
//                                                                     candidateInfo.initials
//                                                                 }
//                                                             </AvatarFallback>
//                                                         </Avatar>
//                                                         <div className="flex-1 min-w-0">
//                                                             <CardTitle className="font-semibold text-gray-900 dark:text-white truncate text-base">
//                                                                 {
//                                                                     candidateInfo.name
//                                                                 }
//                                                             </CardTitle>
//                                                             <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                                                                 {
//                                                                     interview.title
//                                                                 }
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 </CardHeader>

//                                                 {/* Date and Time */}
//                                                 <CardContent className="p-4 pt-0">
//                                                     <div className="space-y-2">
//                                                         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                                                             <CalendarIcon className="w-4 h-4 flex items-center justify-center" />
//                                                             <span>
//                                                                 {format(
//                                                                     startTime,
//                                                                     "MMM dd, yyyy"
//                                                                 )}
//                                                             </span>
//                                                         </div>
//                                                         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                                                             <ClockIcon className="w-4 h-4 flex items-center justify-center" />
//                                                             <span>
//                                                                 {format(
//                                                                     startTime,
//                                                                     "hh:mm a"
//                                                                 )}
//                                                             </span>
//                                                         </div>
//                                                     </div>
//                                                 </CardContent>

//                                                 {/* Pass/Fail & Comments */}
//                                                 <CardFooter className="p-4 pt-2 flex flex-col gap-3">
//                                                     {interview.status ===
//                                                         "completed" && (
//                                                         <div className="flex gap-2 w-full mb-2">
//                                                             <Button
//                                                                 className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
//                                                                 onClick={() =>
//                                                                     handleStatusUpdate(
//                                                                         interview._id,
//                                                                         "succeeded"
//                                                                     )
//                                                                 }
//                                                             >
//                                                                 Pass
//                                                             </Button>

//                                                             <Button
//                                                                 className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
//                                                                 onClick={() =>
//                                                                     handleStatusUpdate(
//                                                                         interview._id,
//                                                                         "failed"
//                                                                     )
//                                                                 }
//                                                             >
//                                                                 Fail
//                                                             </Button>
//                                                         </div>
//                                                     )}

//                                                     {/* This handles the 'Add Comment' button style from the snippet */}
//                                                     <div className="w-full">
//                                                         <CommentDialog
//                                                             interviewId={
//                                                                 interview._id
//                                                             }
//                                                         />
//                                                     </div>
//                                                 </CardFooter>
//                                             </Card>
//                                         );
//                                     }
//                                 )}
//                             </div>
//                         </section>
//                     )
//             )}
//         </div>
//     </div>
// );

"use client";

import Link from "next/link";
import {
    Sparkles,
    Mic,
    BarChart2,
    RefreshCw,
    Target,
    PlayCircle,
    Bot,
    Lightbulb,
    Star,
} from "lucide-react";

export default function MockInterviewBanner() {
    return (
        <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-app-purple-600 via-app-purple-500 to-app-purple-700 dark:from-app-purple-700 dark:via-app-purple-600 dark:to-app-purple-800 shadow-lg">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-app-purple-400/20 to-pink-400/20 blur-3xl"></div>

            <div className="relative px-8 py-10 lg:px-12 lg:py-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Text Content */}
                    <div className="flex-1 text-white">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-4">
                            <Sparkles className="h-3 w-3" />
                            AI POWERED
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                            Prepare Smarter with AI Mock Interviews
                        </h2>

                        <p className="text-purple-100 text-base lg:text-lg mb-6 leading-relaxed">
                            Practice real interview questions, get instant
                            feedback, and boost your confidence before the real
                            interview.
                        </p>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            <div className="flex items-center gap-2 text-sm text-purple-50">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <Mic className="h-4 w-4" />
                                </div>
                                <span>Real-time AI interviewer</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-purple-50">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <BarChart2 className="h-4 w-4" />
                                </div>
                                <span>Performance feedback & scoring</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-purple-50">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <RefreshCw className="h-4 w-4" />
                                </div>
                                <span>Retake interviews anytime</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-purple-50">
                                <div className="w-5 h-5 flex items-center justify-center">
                                    <Target className="h-4 w-4" />
                                </div>
                                <span>Role & tech-specific questions</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/interview-platform/schedule">
                                <button className="w-full sm:w-auto px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 hover:shadow-xl transform hover:-translate-y-0.5 transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-2">
                                    <PlayCircle className="h-5 w-5" />
                                    Start AI Mock Interview
                                </button>
                            </Link>

                            {/* Optional: Add Link here if you have a past sessions page */}
                            <button className="w-full sm:w-auto px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/20 border border-white/30 transition-all whitespace-nowrap cursor-pointer">
                                View Past Practice Sessions
                            </button>
                        </div>
                    </div>

                    {/* Right Illustration (Robot) */}
                    <div className="flex-shrink-0 relative">
                        <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                            {/* Pulsing Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-purple-300/30 rounded-full blur-2xl animate-pulse"></div>

                            {/* Main Circle */}
                            <div className="relative w-full h-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md rounded-full border-2 border-white/30 flex items-center justify-center shadow-2xl">
                                <div className="w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center">
                                    <Bot className="h-20 w-20 lg:h-24 lg:w-24 text-white opacity-90" />
                                </div>
                            </div>

                            {/* Floating Icons */}
                            <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full border border-white/40 flex items-center justify-center animate-bounce">
                                <Lightbulb className="h-5 w-5 text-white" />
                            </div>

                            <div
                                className="absolute -bottom-2 -left-2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full border border-white/40 flex items-center justify-center animate-bounce"
                                style={{ animationDelay: "0.5s" }}>
                                <Star className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
