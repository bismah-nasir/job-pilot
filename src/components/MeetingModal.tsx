import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useMeetingActions from "@/hooks/useMeetingActions";

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isJoinMeeting: boolean;
}

function MeetingModal({
    isOpen,
    onClose,
    title,
    isJoinMeeting,
}: MeetingModalProps) {
    const [meetingUrl, setMeetingUrl] = useState("");

    const { createInstantMeeting, joinMeeting } = useMeetingActions();

    const handleStart = () => {
        if (isJoinMeeting) {
            // If it's full URL extract meeting id from the url
            const meetingId = meetingUrl.split("/").pop();

            if (meetingId) {
                joinMeeting(meetingId);
            }
        } else {
            createInstantMeeting();
        }
        setMeetingUrl("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-106.25 bg-app-white dark:bg-app-gray-800 p-6 rounded-lg border-none shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-app-gray-900 dark:text-app-white mb-2">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                    {isJoinMeeting && (
                        <Input
                            className="bg-app-white dark:bg-app-gray-700 text-app-gray-900 dark:text-app-white border-app-gray-300 dark:border-app-gray-600"
                            placeholder="Paste meeting link here..."
                            value={meetingUrl}
                            onChange={(e) => setMeetingUrl(e.target.value)}
                        />
                    )}

                    <div className="flex justify-end gap-3">
                        <Button
                            className="px-4 py-2 border border-app-gray-300 dark:border-app-gray-600 text-app-gray-700 dark:text-app-gray-300 rounded-lg hover:bg-app-gray-50 dark:hover:bg-app-gray-700 transition-colors whitespace-nowrap cursor-pointer bg-transparent shadow-none"
                            onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            className="px-4 py-2 bg-app-purple-600 text-app-white rounded-lg hover:bg-app-purple-700 transition-colors whitespace-nowrap cursor-pointer shadow-none hover:text-app-white"
                            onClick={handleStart}
                            disabled={isJoinMeeting && !meetingUrl.trim()}>
                            {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default MeetingModal;
