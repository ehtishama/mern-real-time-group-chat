import { useState } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";
import { generateAvatar } from "../../helpers/profile";
import { useUser } from "../../hooks/useUser";
import LogoutIcon from "../../icons/logout";
import UserIcon from "../../icons/user";
import ChevronDown from "./chevron-down";

export default function Profile() {
    const { user } = useUser();
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div
            style={{ marginTop: "auto" }}
            className="bg-dark-50 py-3 px-4 flex items-center gap-3 relative cursor-pointer hover:bg-dark-hover"
        >
            <div className="rounded-md shadow overflow-hidden">
                <img
                    src={generateAvatar(user.username)}
                    alt="Profile"
                    className="h-10 w-10"
                />
            </div>

            <p className="font-medium select-none">
                {user.firstname + " " + user.lastname}
            </p>

            <button
                onClick={() => setShowPopup(!showPopup)}
                className={"ml-auto rounded hover:bg-dark-200"}
            >
                <ChevronDown />
            </button>

            {/* popup */}
            <div
                className={`${
                    showPopup ? "bottom-14" : "invisible bottom-0"
                } absolute right-2 p-3 rounded-md border border-neutral-600 bg-dark-200 w-44 transition`}
            >
                <ul>
                    <li className="cursor-pointer hover:bg-dark-hover select-none rounded-md">
                        <div className="flex items-center gap-2 p-2 ">
                            <UserIcon />
                            <span className="text">My Profile</span>
                        </div>
                    </li>
                    <div className="h-0.5 bg-gray-500 my-4 mx-2" />
                    <li className="cursor-pointer bg-red-800 bg-opacity-30 select-none rounded-md">
                        <Link to={ROUTES.LOGOUT}>
                            <div className="flex items-center gap-2 p-2 text-red-200">
                                <LogoutIcon />
                                <span className="text-sm font-medium">
                                    Logout
                                </span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
