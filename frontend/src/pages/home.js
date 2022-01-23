import MessagePanel from "../components/message-panel";
import Sidebar from "../components/sidebar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { socket } from "../lib/socket";
import { useDispatch } from "react-redux";
import { fetchChannelsThunk, setSelectedChannel } from "../store/channelsSlice";

export default function Home() {
    const { user } = useUser();
    const { channelId } = useParams();
    const dispatch = useDispatch();

    // fetch all channels, only once
    useEffect(() => {
        dispatch(fetchChannelsThunk());
    }, [dispatch]);

    // change selected channel, when channelId changes
    useEffect(() => {
        if (!channelId) return;

        dispatch(setSelectedChannel(channelId));

        return () => {
            dispatch(setSelectedChannel(null));
        };
    }, [channelId, dispatch]);

    // connect to socket server, every time when channel changes
    useEffect(() => {
        if (!channelId) return;

        // connect to web sockets
        socket.auth = { user: user._id, channel: channelId };
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, [channelId, user._id]);

    return (
        <div className="flex">
            <Sidebar />
            <MessagePanel />
        </div>
    );
}
