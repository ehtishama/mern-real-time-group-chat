import { generateAvatar } from "../../helpers/profile";
import { formatRelative } from "date-fns";

export default function Message({ className, message }) {
    return (
        <div className={`flex items-start gap-2 py-2 md:gap-6 md:py-4 ${className}`}>
            <div className="w-8 h-8 shrink-0 rounded shadow overflow-hidden">
                <img
                    src={generateAvatar(message.author.username)}
                    alt="Profile"
                />
            </div>

            <div className="w-full">
                <div className="flex gap-2 items-center ">
                    <h3 className="text font-medium text-gray-400">{`${message.author.firstname} ${(message.author.lastname)[0]}.`}</h3>
                    <p className="ml-auto md:ml-0 text-xs text-gray-500">
                        {formatRelative(
                            new Date(message.createdAt),
                            new Date()
                        )}
                    </p>
                </div>

                <p className="text-sm text-gray-300">{message.content}</p>
            </div>
        </div>
    );
}
