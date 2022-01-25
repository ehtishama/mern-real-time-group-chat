import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { socket } from "../../lib/socket";
import { getMessages, postMessage } from "../../services/api";
import { selectChannelById, selectIsMember } from "../../store/channelsSlice";
import {
    addOneMessage,
    fetchMessagesThunk,
    selectAllMessages,
    selectMessagesStatus,
} from "../../store/messagesSlice";
import InfiniteProgress from "../infinite-progress";
import JoinChannel from "../join-channel";
import AllMessages from "./all-messages";
import NewMessageForm from "./new-message-form";

export default function MessagePanel() {
    const { user } = useUser();
    const { channelId } = useParams();

    const channel = useSelector((state) => selectChannelById(state, channelId));
    const isMember = useSelector((state) =>
        selectIsMember(state, user._id, channelId)
    );

    const dispatch = useDispatch();
    const loadingMessages = useSelector(
        (state) => selectMessagesStatus(state) === "loading"
    );
    const messages =
        useSelector((state) => selectAllMessages(state, channelId)) || [];

    const emptyDiv = useRef();

    async function addNewMessage(message) {
        dispatch(addOneMessage({ channelId, message }));
        try {
            await postMessage(channelId, message.content);
        } catch (error) {
            console.log(error);
        }
    }

    function scrollToBottom() {
        emptyDiv.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        socket.on("new_message", (payload) => {
            if (
                payload &&
                payload.channel === channelId &&
                payload.author._id !== user._id
            ) {
                dispatch(addOneMessage({ channelId, message: payload }));
            }
        });
        return () => socket.removeListener("new_message");
    }, [channelId, user._id, dispatch]);

    useEffect(() => {
        if (!channelId || !isMember) return;
        dispatch(fetchMessagesThunk({ channelId }));
    }, [channelId, isMember, dispatch]);

    useEffect(() => {
        scrollToBottom();
    });

    return (
        <div className="text-gray-200 h-screen bg-dark-200 w-full">
            <div className="flex flex-col h-full">
                {/* header */}
                <div className="px-16 py-4 h-12 shadow-sm shadow-black flex items-center">
                    <h2 className="font-medium">{channel?.name}</h2>
                </div>
                <div className="overflow-auto" style={{ flexGrow: 1 }}>
                    {isMember === undefined ? null : isMember === false ? (
                        <div className="w-full">
                            <JoinChannel channel={channel} />
                        </div>
                    ) : (
                        <div>
                            {loadingMessages ? (
                                <div className="my-10 flex justify-center">
                                    <InfiniteProgress
                                        className={"text-blue-400"}
                                    />
                                </div>
                            ) : (
                                <>
                                    <AllMessages messages={messages} />
                                    <div ref={emptyDiv} />
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* new message input */}
                <NewMessageForm
                    channelId={channelId}
                    onNewMessage={addNewMessage}
                />
            </div>
        </div>
    );
}
