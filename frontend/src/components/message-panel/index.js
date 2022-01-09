import { useEffect, useState } from "react";
import { getMessages, postMessage } from "../../services/api";
import JoinChannel from "../join-channel";
import Message from "./message";
import NewMessageForm from "./new-message-form";

export default function MessagePanel({ channel, isMember, setIsMember }) {
    const channelId = channel?._id;

    const [messages, setMessages] = useState([]);

    const addNewMessage = (message) => {
        setMessages([...messages, message]);
        postMessage(channelId, message.content)
            .then(console.log)
            .catch(console.log);
    };

    useEffect(() => {
        if (!channelId || !isMember) return;
        getMessages(channelId).then(setMessages).catch(console.log);
    }, [channelId, isMember]);

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
                            <JoinChannel channel={channel} setIsMember={setIsMember} />
                        </div>
                    ) : (
                        <div>
                            {/* messages */}
                            {messages.map((message) => {
                                return (
                                    <Message
                                        key={message._id}
                                        message={message}
                                        className={"px-12"}
                                    />
                                );
                            })}
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
