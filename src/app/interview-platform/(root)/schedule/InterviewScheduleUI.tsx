import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import toast from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import UserInfo from "@/components/UserInfo";
import { Loader2Icon, XIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TIME_SLOTS } from "@/constants";
import MeetingCard from "@/components/MeetingCard";

function InterviewScheduleUI() {
    const client = useStreamVideoClient();
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const interviews = useQuery(api.interviews.getAllInterviews) ?? [];
    const users = useQuery(api.users.getUsers) ?? [];
    const createInterview = useMutation(api.interviews.createInterview);

    const candidates = users?.filter((u) => u.role === "candidate");
    const interviewers = users?.filter((u) => u.role === "interviewer");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: new Date(),
        time: "09:00",
        candidateId: "",
        interviewerIds: user?.id ? [user.id] : [],
    });

    const scheduleMeeting = async () => {
        if (!client || !user) {
            return;
        }

        if (!formData.candidateId || formData.interviewerIds.length === 0) {
            toast.error(
                "Please select both candidate and atleast one interviewer"
            );
            return;
        }

        setIsCreating(true);

        try {
            const {
                title,
                description,
                date,
                time,
                candidateId,
                interviewerIds,
            } = formData;
            const [hours, minutes] = time.split(":");
            const meetingDate = new Date(date);
            meetingDate.setHours(parseInt(hours), parseInt(minutes), 0);
            console.log("Meeting Set");

            const id = crypto.randomUUID();
            const call = client.call("default", id);
            console.log("Call created");

            const data = {
                data: {
                    starts_at: meetingDate.toISOString(),
                    custom: {
                        description: title,
                        additionalDetails: description,
                    },
                },
            };

            console.log(data);

            await call.getOrCreate(data);

            console.log("Call object found");

            await createInterview({
                title,
                description,
                startTime: meetingDate.getTime(),
                status: "upcoming",
                streamCallId: id,
                candidateId,
                interviewerIds,
            });

            console.log("Created Interview");

            setOpen(false);
            toast.success("Meeting scheduled successfully!");

            setFormData({
                title: "",
                description: "",
                date: new Date(),
                time: "09:00",
                candidateId: "",
                interviewerIds: user?.id ? [user.id] : [],
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to schedule meeting. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };

    const addInterviewer = (interviewerId: string) => {
        if (!formData.interviewerIds.includes(interviewerId)) {
            setFormData((prev) => ({
                ...prev,
                interviewerIds: [...prev.interviewerIds, interviewerId],
            }));
        }
    };

    const removeInterviewer = (interviewerId: string) => {
        if (interviewerId === user?.id) {
            return;
        }
        setFormData((prev) => ({
            ...prev,
            interviewerIds: prev.interviewerIds.filter(
                (id) => id !== interviewerId
            ),
        }));
    };

    const selectedInterviewers = interviewers.filter((i) =>
        formData.interviewerIds.includes(i.clerkId)
    );

    const availableInterviewers = interviewers.filter(
        (i) => !formData.interviewerIds.includes(i.clerkId)
    );

    return (
        <div className="container max-w-7xl mx-auto p-6 space-y-8">
            <div className="bg-app-white dark:bg-app-gray-800 rounded-lg bg-card p-6 border border-app-gray-100 dark:border-app-gray-700 shadow-sm mb-10">
                <div className="flex items-center justify-between">
                    {/* Header Info */}
                    <div>
                        <h1 className="text-2xl font-bold text-app-gray-900 dark:text-app-white">
                            Interviews
                        </h1>
                        <p className="text-md text-app-gray-600 dark:text-app-gray-400 mt-1">
                            Schedule and manage interviews
                        </p>
                    </div>

                    {/* Dialog */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                size="lg"
                                className="px-6 py-3 bg-app-purple-600 text-app-white font-medium rounded-lg hover:bg-app-purple-700 shadow-sm hover:shadow-md transition-all whitespace-nowrap cursor-pointer">
                                Schedule Interviews
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-2xl bg-app-white dark:bg-app-gray-900 border border-app-gray-200 dark:border-app-gray-700 rounded-lg p-6 max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                {/* TITLE: text-2xl, font-semibold, text-gray-900 */}
                                <DialogTitle className="text-2xl font-semibold text-app-gray-900 dark:text-app-white mb-2">
                                    Schedule Interview
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6 py-4">
                                {/* Interview Title */}
                                {/* <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Title
                                    </label>
                                    <Input
                                        placeholder="Interview title"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                </div> */}
                                <div>
                                    <label className="block text-sm font-medium text-app-gray-700 dark:text-app-gray-300 mb-2">
                                        Title{" "}
                                        <span className="text-app-red-500">
                                            *
                                        </span>
                                    </label>
                                    <Input
                                        className="w-full px-4 py-2 border border-app-gray-300 dark:border-app-gray-600 rounded-lg text-sm focus-visible:ring-2 focus-visible:ring-app-purple-500 focus-visible:border-transparent bg-app-white dark:bg-app-gray-800 dark:text-app-white shadow-none"
                                        placeholder="e.g., Senior Frontend Developer Interview"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* 03 : 34 : 09 */}
                                {/* Interview Description */}
                                {/* <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Description
                                    </label>
                                    <Textarea
                                        placeholder="Interview description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                    />
                                </div> */}
                                <div>
                                    <label className="block text-sm font-medium text-app-gray-700 dark:text-app-gray-300 mb-2">
                                        Description
                                    </label>
                                    <Textarea
                                        className="w-full px-4 py-2 border border-app-gray-300 dark:border-app-gray-600 rounded-lg text-sm focus-visible:ring-2 focus-visible:ring-app-purple-500 focus-visible:border-transparent bg-app-white dark:bg-app-gray-800 dark:text-app-white shadow-none"
                                        placeholder="Brief description of the interview"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows={3}
                                    />
                                </div>

                                {/* Candidate */}
                                {/* <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Candidate
                                    </label>
                                    <Select
                                        value={formData.candidateId}
                                        onValueChange={(candidateId) =>
                                            setFormData({
                                                ...formData,
                                                candidateId,
                                            })
                                        }>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select candidate" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {candidates.map((candidate) => (
                                                <SelectItem
                                                    key={candidate.clerkId}
                                                    value={candidate.clerkId}>
                                                    <UserInfo
                                                        user={candidate}
                                                    />
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div> */}

                                <div>
                                    <label className="block text-sm font-medium text-app-gray-700 dark:text-app-gray-300 mb-2">
                                        Candidate{" "}
                                        <span className="text-app-red-500">
                                            *
                                        </span>
                                    </label>
                                    <Select
                                        value={formData.candidateId}
                                        onValueChange={(candidateId) =>
                                            setFormData({
                                                ...formData,
                                                candidateId,
                                            })
                                        }>
                                        <SelectTrigger className="w-full px-4 py-2 border border-app-gray-300 dark:border-app-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-purple-app-500 focus:border-transparent bg-app-white dark:bg-app-gray-800 dark:text-app-white shadow-none">
                                            <SelectValue placeholder="Select candidate" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-app-white dark:bg-app-gray-800 border-app-gray-200 dark:border-app-gray-700">
                                            {candidates.map((candidate) => (
                                                <SelectItem
                                                    key={candidate.clerkId}
                                                    value={candidate.clerkId}
                                                    className="hover:bg-app-purple-50 dark:hover:bg-app-purple-900/20 focus:bg-app-purple-50 dark:focus:bg-purple-app-900/20 cursor-pointer">
                                                    <UserInfo
                                                        user={candidate}
                                                    />
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Interviewers */}
                                {/* <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Interviewers
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {selectedInterviewers.map(
                                            (interviewer) => (
                                                <div
                                                    key={interviewer.clerkId}
                                                    className="inline-flex items-center gap-2 bg-secondary px-2 py-1 rounded-md text-sm">
                                                    <UserInfo
                                                        user={interviewer}
                                                    />
                                                    {interviewer.clerkId !==
                                                        user?.id && (
                                                        <button
                                                            onClick={() =>
                                                                removeInterviewer(
                                                                    interviewer.clerkId
                                                                )
                                                            }
                                                            className="hover:text-destructive transition-colors">
                                                            <XIcon className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {availableInterviewers.length > 0 && (
                                        <Select onValueChange={addInterviewer}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Add interviewer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableInterviewers.map(
                                                    (interviewer) => (
                                                        <SelectItem
                                                            key={
                                                                interviewer.clerkId
                                                            }
                                                            value={
                                                                interviewer.clerkId
                                                            }>
                                                            <UserInfo
                                                                user={
                                                                    interviewer
                                                                }
                                                            />
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div> */}

                                <div>
                                    <label className="block text-sm font-medium text-app-gray-700 dark:text-app-gray-300 mb-2">
                                        Interviewers{" "}
                                        <span className="text-app-red-500">
                                            *
                                        </span>
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-2 p-2 border border-dashed border-app-gray-300 dark:border-app-gray-600 rounded-lg min-h-10.5 bg-app-gray-50/50 dark:bg-app-gray-800/50">
                                        {selectedInterviewers.map(
                                            (interviewer) => (
                                                <div
                                                    key={interviewer.clerkId}
                                                    className="inline-flex items-center gap-2 bg-app-purple-100 dark:bg-app-purple-900/30 text-app-purple-700 dark:text-app-purple-300 px-2 py-1 rounded-md text-xs font-medium">
                                                    <UserInfo
                                                        user={interviewer}
                                                    />
                                                    {interviewer.clerkId !==
                                                        user?.id && (
                                                        <button
                                                            onClick={() =>
                                                                removeInterviewer(
                                                                    interviewer.clerkId
                                                                )
                                                            }
                                                            className="hover:text-app-purple-900 dark:hover:text-app-purple-100 transition-colors">
                                                            <XIcon className="h-3 w-3" />
                                                        </button>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {availableInterviewers.length > 0 && (
                                        <Select onValueChange={addInterviewer}>
                                            <SelectTrigger className="w-full px-4 py-2 border border-app-gray-300 dark:border-app-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-app-purple-500 focus:border-transparent bg-app-white dark:bg-app-gray-800 dark:text-app-white shadow-none">
                                                <SelectValue placeholder="Add interviewer" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-app-white dark:bg-app-gray-800 border-app-gray-200 dark:border-app-gray-700">
                                                {availableInterviewers.map(
                                                    (interviewer) => (
                                                        <SelectItem
                                                            key={
                                                                interviewer.clerkId
                                                            }
                                                            value={
                                                                interviewer.clerkId
                                                            }
                                                            className="hover:bg-app-purple-50 dark:hover:bg-app-purple-900/20 cursor-pointer">
                                                            <UserInfo
                                                                user={
                                                                    interviewer
                                                                }
                                                            />
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>

                                {/* Date and Time */}
                                {/* <div className="flex gap-4"> */}
                                {/* Calendar Component */}
                                {/* <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Date
                                        </label>
                                        <Calendar
                                            mode="single"
                                            selected={formData.date}
                                            onSelect={(date) =>
                                                date &&
                                                setFormData({
                                                    ...formData,
                                                    date,
                                                })
                                            }
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            className="rounded-md border"
                                        />
                                    </div> */}

                                {/* Time Component */}
                                {/* <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Time
                                        </label>
                                        <Select
                                            value={formData.time}
                                            onValueChange={(time) =>
                                                setFormData({
                                                    ...formData,
                                                    time,
                                                })
                                            }>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {TIME_SLOTS.map((time) => (
                                                    <SelectItem
                                                        key={time}
                                                        value={time}>
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div> */}
                                {/* </div> */}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Date Component */}
                                    <div>
                                        <label className="block text-sm font-medium text-app-gray-700 dark:text-app-gray-300 mb-2">
                                            Date{" "}
                                            <span className="text-app-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="p-3 border border-app-gray-300 dark:border-app-gray-600 rounded-lg bg-app-white dark:bg-app-gray-800">
                                            <Calendar
                                                mode="single"
                                                selected={formData.date}
                                                onSelect={(date) =>
                                                    date &&
                                                    setFormData({
                                                        ...formData,
                                                        date,
                                                    })
                                                }
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                className="rounded-md"
                                                classNames={{
                                                    selected:
                                                        "!bg-app-purple-600 !text-app-white !hover:bg-app-purple-700 !focus:bg-app-purple-600 !border-0 !border-transparent !rounded-md !outline-none !ring-2 !ring-app-purple-500 !ring-offset-2 !ring-offset-app-white dark:!ring-offset-app-gray-800",

                                                    today: "bg-app-gray-100 dark:bg-app-gray-700 text-app-gray-900 dark:text-app-white rounded-md",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Time Component */}
                                    <div>
                                        <label className="block text-sm font-medium text-app-gray-700 dark:text-app-gray-300 mb-2">
                                            Time{" "}
                                            <span className="text-app-red-500">
                                                *
                                            </span>
                                        </label>
                                        <Select
                                            value={formData.time}
                                            onValueChange={(time) =>
                                                setFormData({
                                                    ...formData,
                                                    time,
                                                })
                                            }>
                                            <SelectTrigger className="w-full px-4 py-2 border border-app-gray-300 dark:border-app-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-app-purple-500 focus:border-transparent bg-app-white dark:bg-app-gray-800 dark:text-app-white shadow-none">
                                                <SelectValue placeholder="Select time" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-app-white dark:bg-app-gray-800 border-app-gray-200 dark:border-app-gray-700 max-h-50">
                                                {TIME_SLOTS.map((time) => (
                                                    <SelectItem
                                                        key={time}
                                                        value={time}
                                                        className="hover:bg-app-purple-50 dark:hover:bg-app-purple-900/20 cursor-pointer">
                                                        {time}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* ACTION BUTTONS */}
                                {/* <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={scheduleMeeting}
                                        disabled={isCreating}>
                                        {isCreating ? (
                                            <>
                                                <Loader2Icon className="mr-2 size-4 animate-spin" />
                                                Scheduling...
                                            </>
                                        ) : (
                                            "Schedule Interview"
                                        )}
                                    </Button>
                                </div> */}

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                        // CANCEL BUTTON: Styled as 'border border-gray-300'
                                        className="w-auto px-4 py-2 border border-app-gray-300 dark:border-app-gray-600 text-app-gray-700 dark:text-app-gray-300 rounded-lg hover:bg-app-gray-50 dark:hover:bg-app-gray-800 transition-colors shadow-none">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={scheduleMeeting}
                                        disabled={isCreating}
                                        // SUBMIT BUTTON: Styled as 'bg-purple-600'
                                        className="w-auto px-4 py-2 bg-app-purple-600 text-app-white rounded-lg hover:bg-app-purple-700 transition-colors shadow-sm">
                                        {isCreating ? (
                                            <>
                                                <Loader2Icon className="mr-2 size-4 animate-spin" />
                                                Scheduling...
                                            </>
                                        ) : (
                                            "Schedule Interview"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* LOADING STATE & MEETING CARDS */}
                <div className="mt-8">
                    {!interviews ? (
                        <div className="flex justify-center py-12">
                            <Loader2Icon className="size-8 animate-spin text-app-gray-500 dark:text-app-gray-400" />
                        </div>
                    ) : interviews.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {interviews.map((interview) => (
                                <MeetingCard
                                    key={interview._id}
                                    interview={interview}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-md text-app-gray-600 dark:text-app-gray-400">
                            No interviews scheduled
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InterviewScheduleUI;
