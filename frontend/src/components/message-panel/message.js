import { generateAvatar } from "../../helpers/profile";

export default function Message({ className, message }) {
    return (
        <div className={`flex gap-6 py-4 ${className}`}>
            <div className="w-8 h-8 shrink-0 rounded shadow overflow-hidden">
                <img
                    src={generateAvatar(message.author.username)}
                    alt="Profile"
                />
            </div>

            <div>
                <div className="flex gap-2 items-center text-gray-400">
                    <h3 className="text font-medium">{`${message.author.firstname} ${message.author.lastname}`}</h3>
                    <p className="text-xs">yesterday at 14:02</p>
                </div>

                <p className="text-sm">{message.content}</p>
            </div>
        </div>
    );
}
