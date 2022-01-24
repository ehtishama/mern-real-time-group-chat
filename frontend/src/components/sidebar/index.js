import Modal from "./modal";
import { useEffect, useState } from "react";
import { AllChannels } from "./all-channels";
import SelectedChannel from "./selected-channel";
import { getMembers } from "../../services/api";
import { useParams } from "react-router-dom";
import { useApiErrors } from "../../contexts/apiErrorContext";
import Profile from "./profile";
import HamMenu from "../../icons/ham-menu";
import { useDispatch, useSelector } from "react-redux";
import { selectChannelById, selectIsMember } from "../../store/channelsSlice";
import { useUser } from "../../hooks/useUser";
import {
    fetchMembersThunk,
    selectChannelMembers,
} from "../../store/membersSlice";

export default function Sidebar() {
    const { channelId } = useParams();
    const {
        user: { _id: userId },
    } = useUser();
    const channel = useSelector((state) => selectChannelById(state, channelId));
    const isMember = useSelector((state) =>
        selectIsMember(state, userId, channelId)
    );
    const members =
        useSelector((state) => selectChannelMembers(state, channelId)) || [];
    const dispatch = useDispatch();

    // UI state
    const [modalOpen, setModalOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    // fetch member of selected channel
    useEffect(() => {
        if (!channelId || !isMember) return;

        if (members.length === 0) dispatch(fetchMembersThunk({ channelId }));
    }, [channelId, isMember, dispatch]);

    return (
        <div
            className={`absolute md:static md:translate-x-0 ${
                !showSidebar ? "translate-x-[-290px]" : ""
            } transition-transform`}
        >
            <div className="sidebar shrink-0 text-gray-50 h-screen w-72 bg-dark-100 flex flex-col">
                <div className="md:hidden absolute my-2 -right-14 flex items-center">
                    <button
                        onClick={() => setShowSidebar((show) => !show)}
                        className="bg-dark-hover hover:bg-dark-50 rounded p-1"
                    >
                        <HamMenu />
                    </button>
                </div>
                {!channelId ? (
                    <AllChannels
                        handleCreateBtnClick={() => setModalOpen((old) => !old)}
                    />
                ) : (
                    <SelectedChannel channel={channel} members={members} />
                )}

                {/* profile */}
                <Profile />

                {/* modal - make sure parent is not relative */}
                <Modal open={modalOpen} setOpen={setModalOpen} />
            </div>
        </div>
    );
}
