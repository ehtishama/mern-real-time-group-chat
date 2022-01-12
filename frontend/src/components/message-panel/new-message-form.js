import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import PaperPlane from "../../icons/paper-plane";

export default function NewMessageForm({ channelId, onNewMessage }) {
    const [message, setMessage] = useState("");
    const { user } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!channelId) return;

        const newMessage = {
            _id: Date.now() * 10, // temporary id
            author: { ...user },
            content: message,
            channel: channelId,
            createdAt: Date.now(),
        };

        onNewMessage(newMessage);
        setMessage("");
    };

    return (
        <div className="my-6 px-4 md:px-12">
            <div className="px-3 py-1 pr-1 shadow rounded-lg bg-dark-input">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="bg-transparent text-sm w-full m-0 p-0 outline-none focus:outline-none"
                            placeholder="Write new message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="bg-blue-500 shadow hover:shadow-sm hover:bg-blue-600 rounded-lg text-white text-sm p-2">
                            <PaperPlane className={"rotate-90"} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
