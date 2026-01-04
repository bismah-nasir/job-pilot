import { useRouter } from "next/navigation";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";

const useMeetingActions = () => {
    const router = useRouter();
    const client = useStreamVideoClient();

    // Function for create instant meeting
    const createInstantMeeting = async () => {
        if (!client) {
            return;
        }

        try {
            const id = crypto.randomUUID();
            const call = client.call("default", id);

            await call.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                    custom: {
                        description: "Instant Meeting",
                    },
                },
            });

            router.push(`/interview-platform/meeting/${call.id}`);
            toast.success("Meeting Created");

        } catch (error) {
            console.error(error);
            toast.error("Failed to create meeting hehe");
        }
    };

    // Function for join the meeting
    const joinMeeting = async (callId: string) => {
        if (!client) {
            return toast.error("Failed to join meeting. Please try again.");   
        }

        router.push(`/interview-platform/meeting/${callId}`);
    };

    return { createInstantMeeting, joinMeeting };
};

export default useMeetingActions;
