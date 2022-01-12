import { useEffect, useRef, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { socket } from "../../lib/socket";
import { getMessages, postMessage } from "../../services/api";
import InfiniteProgress from "../infinite-progress";
import JoinChannel from "../join-channel";
import AllMessages from "./all-messages";
import NewMessageForm from "./new-message-form";

export default function MessagePanel({
    channel,
    isMember,
    setIsMember,
    addNewMember,
}) {
    const { user } = useUser();
    const channelId = channel?._id;

    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(false);

    const emptyDiv = useRef();

    async function addNewMessage(message) {
        setMessages([...messages, message]);
        try {
            await postMessage(channelId, message.content);
        } catch (error) {
            console.log(error);
        }
    }
    function scrollToBottom() {
        emptyDiv.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        socket.on("new_message", (payload) => {
            if (
                payload &&
                payload.channel === channelId &&
                payload.author._id !== user._id
            ) {
                setMessages((messages) => [...messages, payload]);
            }
        });

        return () => socket.removeListener("new_message");
    }, [channelId, user._id]);

    useEffect(() => {
        if (!channelId || !isMember) return;
        setLoadingMessages(true);
        getMessages(channelId)
            .then(
                (resp) =>
                    new Promise((resolve) =>
                        setTimeout(() => resolve(resp), 2000)
                    )
            )
            .then((messages) => {
                setMessages(messages);
                setLoadingMessages(false);
            })
            .catch(console.log);
        return () => setMessages([]);
    }, [channelId, isMember]);

    useEffect(() => {
        scrollToBottom();
    });

    return (
        <div className="text-gray-200 h-screen bg-dark-200 w-full">
            <div className="flex flex-col h-full">
                {/* header */}
                <div className="px-16 py-4 h-12 shadow-sm shadow-black flex items-center">
                    <h2 className="font-medium">{channel?.name}</h2>
                </div>
                <div className="overflow-auto" style={{ flexGrow: 1 }}>
                    {isMember === undefined ? null : isMember === false ? (
                        <div className="w-full">
                            <JoinChannel
                                channel={channel}
                                setIsMember={setIsMember}
                                addNewMember={addNewMember}
                            />
                        </div>
                    ) : (
                        <div>
                            {loadingMessages ? (
                                <div className="my-10 flex justify-center">
                                    <InfiniteProgress
                                        className={"text-blue-400"}
                                    />
                                </div>
                            ) : (
                                <AllMessages messages={messages} />
                            )}
                            <div ref={emptyDiv} />
                        </div>
                    )}
                </div>

                {/* new message input */}
                <NewMessageForm
                    channelId={channelId}
                    onNewMessage={addNewMessage}
                />
            </div>
        </div>
    );
}
