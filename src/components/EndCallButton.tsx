import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

function EndCallButton() {
    const call = useCall();
    const router = useRouter();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const [isEnding, setIsEnding] = useState(false);

    const updateInterviewStatus = useMutation(
        api.interviews.updateInterviewStatus
    );

    // null for instant meetings (no scheduled interview); undefined while loading
    const interview = useQuery(
        api.interviews.getInterviewByStreamCallId,
        call ? { streamCallId: call.id } : "skip"
    );

    if (!call || interview === undefined) return null;

    const isMeetingOwner =
        localParticipant?.userId === call.state.createdBy?.id;

    if (!isMeetingOwner) return null;

    const endCall = async () => {
        setIsEnding(true);
        try {
            await call.endCall();

            // Only scheduled interviews have a Convex record to update
            if (interview) {
                await updateInterviewStatus({
                    id: interview._id,
                    status: "completed",
                });
            }

            router.push("/interview-platform");
            toast.success("Meeting ended for everyone");
        } catch (error) {
            console.error(error);
            toast.error("Failed to end meeting");
            setIsEnding(false);
        }
    };

    return (
        <Button
            className="bg-red-600 hover:bg-red-700 text-white font-medium transition-all hover:scale-105 shadow-sm rounded-lg"
            onClick={endCall}
            disabled={isEnding}>
            {isEnding ? "Ending..." : "End Meeting"}
        </Button>
    );
}

export default EndCallButton;
