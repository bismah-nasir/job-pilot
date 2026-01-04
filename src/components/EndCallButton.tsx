import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

function EndCallButton() {
    const call = useCall();
    const router = useRouter();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();

    const updateInterviewStatus = useMutation(
        api.interviews.updateInterviewStatus
    );

    const interview = useQuery(api.interviews.getInterviewByStreamCallId, {
        streamCallId: call?.id || "",
    });

    console.log("Call:", call);
    console.log("Interview:", interview);

    if (!call || !interview) return null;

    const isMeetingOwner =
        localParticipant?.userId === call.state.createdBy?.id;

    if (!isMeetingOwner) return null;

    const endCall = async () => {
        try {
            await call.endCall();

            await updateInterviewStatus({
                id: interview._id,
                status: "completed",
            });

            router.push("/interview-platform");
            toast.success("Meeting ended for everyone");
        } catch (error) {
            console.log(error);
            toast.error("Failed to end meeting");
        }
    };

    return (
        <Button
            className="bg-red-600 hover:bg-red-700 text-white font-medium transition-all hover:scale-105 shadow-sm rounded-lg"
            onClick={endCall}>
            End Meeting
        </Button>
    );
}

export default EndCallButton;
