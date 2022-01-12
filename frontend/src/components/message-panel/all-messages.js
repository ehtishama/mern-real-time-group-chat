import Message from "./message";

export default function AllMessages({ messages }) {
    return messages.map((message) => {
        return (
            <Message
                key={message._id}
                message={message}
                className={"px-6 md:px-12"}
            />
        );
    });
}
