"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI";
import { streamTokenProvider } from "@/actions/stream.action";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const [streamVideoClient, setStreamVideoClient] =
        useState<StreamVideoClient>();
    const { user, isLoaded } = useUser();

    const userId = user?.id;
    const name =
        [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
        user?.username ||
        user?.primaryEmailAddress?.emailAddress ||
        userId;
    const image = user?.imageUrl;

    useEffect(() => {
        if (!isLoaded || !userId) return;

        const client = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
            user: { id: userId, name, image },
            tokenProvider: streamTokenProvider,
        });

        setStreamVideoClient(client);

        // Close the connection when the user changes or the provider unmounts,
        // otherwise every re-render of `user` leaks a websocket.
        return () => {
            client.disconnectUser().catch(console.error);
            setStreamVideoClient(undefined);
        };
        // Recreate only when the identity actually changes, not on every Clerk object update
    }, [isLoaded, userId, name, image]);

    if (!streamVideoClient) return <LoaderUI />;
    return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
