import { useEffect, useState } from "react";
import { getMessages, postMessage } from "../../services/api";
import Message from "./message";
import NewMessageForm from "./new-message-form";

export default function MessagePanel({ channel }) {
    const channelId = channel?._id;

    const [messages, setMessages] = useState([]);

    const addNewMessage = (message) => {
        setMessages([...messages, message]);
        postMessage(channelId, message.content)
            .then(console.log)
            .catch(console.log);
    };

    useEffect(() => {
        if (!channelId) return;
        getMessages(channelId).then(setMessages).catch(console.log);
    }, [channelId]);

    return (
        <div className="text-gray-200 h-screen bg-dark-200 w-full">
            <div className="flex flex-col h-full">
                {/* header */}
                <div className="px-16 py-4 h-12 shadow-sm shadow-black flex items-center">
                    <h2 className="font-medium">{channel?.name}</h2>
                </div>

                {/* messages */}
                <div className="overflow-auto" style={{ flexGrow: 1 }}>
                    <div>
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
