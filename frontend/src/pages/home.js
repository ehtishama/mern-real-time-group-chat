import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessagePanel from "../components/message-panel";
import Sidebar from "../components/sidebar";
import { useUser } from "../hooks/useUser";
import { socket } from "../lib/socket";
import { getChannels } from "../services/api";

export default function Home() {
    const { channelId } = useParams();
    const { user } = useUser();

    const [allChannels, setAllChannels] = useState([]);
    const [filteredChannels, _setFilteredChannels] = useState([]);

    const [selectedChannel, setSelectedChannel] = useState(null);
    const [isMemberOfSelectedChannel, setIsMemberOfSelectedChannel] =
        useState(undefined);

    function setFilteredChannels(channels) {
        if (channels.length === 0) return _setFilteredChannels(allChannels);
        return _setFilteredChannels(channels);
    }

    function addNewChannel(newChannel) {
        setAllChannels([...allChannels, newChannel]);
    }

    function addNewMember(channelId, memberId) {
        const channel = allChannels.find(
            (channel) => channel._id === channelId
        );
        if (!channel) return;
        channel.members.push(memberId);
        const otherChannels = allChannels.filter(
            (channel) => channel._id !== channelId
        );

        setAllChannels(
            [...otherChannels, channel].sort(
                (a, b) => a.createdAt > b.createdAt
            )
        );
    }

    // fetch all channels, only once
    useEffect(() => {
        getChannels()
            .then((channels) => setAllChannels(channels))
            .catch((err) => console.log(err));
    }, []);

    // filtered initially equals to allChannels
    useEffect(() => {
        _setFilteredChannels(allChannels);
    }, [allChannels]);

    // change selected channel, when channelId changes
    useEffect(() => {
        if (!channelId) return;

        const selectedChannel = allChannels.find(
            (channel) => channel._id === channelId
        );
        setSelectedChannel(selectedChannel);

        return () => {
            setSelectedChannel(null);
        };
    }, [channelId, allChannels]);

    // connect to socket server, every time when channel changes
    useEffect(() => {
        if (!selectedChannel || !channelId) return;

        // connect to web sockets
        socket.auth = { user: user._id, channel: channelId };
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, [selectedChannel, channelId, user._id]);

    // see if the current user is a member of selected channel, run whenever selectedChannelChanges
    useEffect(() => {
        if (!selectedChannel) return;
        if (selectedChannel.members.includes(user._id))
            setIsMemberOfSelectedChannel(true);
        else setIsMemberOfSelectedChannel(false);

        return () => {
            setIsMemberOfSelectedChannel(undefined);
        };
    }, [channelId, selectedChannel, user._id]);

    return (
        <div className="flex">
            <Sidebar
                channels={filteredChannels}
                channel={selectedChannel}
                isMember={isMemberOfSelectedChannel}
                addNewChannel={addNewChannel}
                setFilteredChannels={setFilteredChannels}
            />
            <MessagePanel
                channel={selectedChannel}
                isMember={isMemberOfSelectedChannel}
                setIsMember={setIsMemberOfSelectedChannel}
                addNewMember={addNewMember}
            />
        </div>
    );
}
