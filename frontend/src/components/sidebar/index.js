import Modal from "./modal";
import { useEffect, useState } from "react";
import { AllChannels } from "./all-channels";
import SelectedChannel from "./selected-channel";
import { getMembers } from "../../services/api";
import { useParams } from "react-router-dom";
import { useApiErrors } from "../../contexts/apiErrorContext";
import Profile from "./profile";

export default function Sidebar({ channels, channel, isMember, addNewChannel }) {
    const { channelId } = useParams();
    const { errors, setErrors } = useApiErrors();

    // UI state
    const [modalOpen, setModalOpen] = useState(false);

    // content state
    const [members, setMembers] = useState([]);

    // members effect
    useEffect(() => {
        if (!channelId || !isMember) return;

        getMembers(channelId)
            .then(setMembers)
            .catch((err) => {
                // err.response = {data: response from server, status: 403, statusText: Forbidden, headers: {}}
                const {
                    response: {
                        data: { message, status },
                    },
                } = err;

                const key = Date.now();
                setErrors([...errors, { key, message, status }]);
            });
        return () => setMembers([]);
    }, [channelId, isMember]);

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
            <Profile />

            {/* modal - make sure parent is not relative */}
            <Modal open={modalOpen} setOpen={setModalOpen} addNewChannel={addNewChannel} />
        </div>
    );
}
