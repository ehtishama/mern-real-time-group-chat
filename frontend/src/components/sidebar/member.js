import { generateAvatar } from "../../helpers/profile";

export default function Member({className, member}) {
    return (
        <div
            className={`flex gap-4 mb-1 items-center cursor-pointer select-none hover:bg-dark-hover ${className}`}
        >
            <div className="h-8 w-8 rounded bg-dark-200 flex items-center justify-center">
                <img src={generateAvatar(member.username)}
                     className="h-8 w-8 rounded" alt={"User profile"}/>
            </div>

            <h2 className="text-gray-400 font-medium text-sm capitalize">{`${member.firstname} ${member.lastname}`}</h2>
        </div>
    );
}
