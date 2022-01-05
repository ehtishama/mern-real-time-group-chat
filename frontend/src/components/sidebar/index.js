import LogoutIcon from "../../icons/logout";
import UserIcon from "../../icons/user";
import ChevronDown from "./chevron-down";
import Modal from "./modal";
import { useEffect, useState } from "react";
import { AllChannels } from "./all-channels";
import SelectedChannel from "./selected-channel";
import { useUser } from "../../hooks/useUser";
import { getMembers } from "../../services/api";
import { useParams } from "react-router-dom";

export default function Sidebar({ channels, channel }) {
    const { channelId } = useParams();

    // UI state
    const [modalOpen, setModalOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // content state
    const [members, setMembers] = useState([]);

    // context state
    const { user } = useUser();

    // members effect
    useEffect(() => {
        if (!channelId) return;
        getMembers(channelId).then(setMembers).catch(console.log);
        return () => setMembers([]);
    }, [channelId]);

    return (
        <div className="shrink-0 text-gray-50 h-screen w-72 bg-dark-100 space-y-4 flex flex-col">
            {!channelId ? (
                <AllChannels
                    channels={channels}
                    handleCreateBtnClick={() => setModalOpen((old) => !old)}
                />
            ) : (
                <SelectedChannel channel={channel} members={members} />
            )}

            {/* profile */}
            <div
                style={{ marginTop: "auto" }}
                className="bg-dark-50 py-3 px-4 flex items-center gap-3 relative cursor-pointer hover:bg-dark-hover"
            >
                <div className="rounded-md shadow overflow-hidden">
                    <img
                        src="https://randomuser.me/api/portraits/men/47.jpg"
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
                        <li>
                            <div className="flex items-center gap-2 px-2 py-1 text-red-400">
                                <LogoutIcon />
                                <span className="text-sm font-medium">
                                    Logout
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* modal - make sure parent is not relative */}
            <Modal open={modalOpen} setOpen={setModalOpen} />
        </div>
    );
}
