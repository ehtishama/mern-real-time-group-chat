import Modal from "./modal";
import { useEffect, useState } from "react";
import { AllChannels } from "./all-channels";
import SelectedChannel from "./selected-channel";
import { getMembers } from "../../services/api";
import { useParams } from "react-router-dom";
import { useApiErrors } from "../../contexts/apiErrorContext";
import Profile from "./profile";
import HamMenu from "../../icons/ham-menu";

export default function Sidebar({
    channels,
    channel,
    isMember,
    addNewChannel,
    setFilteredChannels
}) {
    const { channelId } = useParams();
    const { setErrors } = useApiErrors();

    // UI state
    const [modalOpen, setModalOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    // content state
    const [members, setMembers] = useState([]);

    // fetch member of selected channel
    useEffect(() => {
        if (!channelId || !isMember) return;

        getMembers(channelId)
            .then(setMembers)
            .catch((err) => {
                const {
                    response: {
                        data: { message, status },
                    },
                } = err;

                const key = Date.now();
                setErrors((errors) => [...errors, { key, message, status }]);
            });
        return () => setMembers([]);
    }, [channelId, isMember, setErrors]);

    return (
        <div className={`absolute md:static md:translate-x-0 ${!showSidebar ? 'translate-x-[-290px]' : ''} transition-transform`}>
            <div className="sidebar shrink-0 text-gray-50 h-screen w-72 bg-dark-100 flex flex-col">
                <div className="md:hidden absolute my-2 -right-14 flex items-center">
                    <button onClick={() => setShowSidebar(show => !show)} className="bg-dark-hover hover:bg-dark-50 rounded p-1">
                        <HamMenu />
                    </button>
                </div>
                {!channelId ? (
                    <AllChannels
                        channels={channels}
                        handleCreateBtnClick={() => setModalOpen((old) => !old)}
                        setFilteredChannels={setFilteredChannels}
                    />
                ) : (
                    <SelectedChannel channel={channel} members={members} />
                )}

                {/* profile */}
                <Profile />

                {/* modal - make sure parent is not relative */}
                <Modal
                    open={modalOpen}
                    setOpen={setModalOpen}
                    addNewChannel={addNewChannel}
                />
            </div>
        </div>
    );
}
