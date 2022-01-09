import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessagePanel from "../components/message-panel";
import Sidebar from "../components/sidebar";
import { useUser } from "../hooks/useUser";
import { getChannels } from "../services/api";

export default function Home() {
    const { channelId } = useParams();

    const { user } = useUser();
    const [allChannels, setAllChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [isMemberOfSelectedChannel, setIsMemberOfSelectedChannel] =
        useState(undefined);

    const addNewChannel = (newChannel) => {
        setAllChannels([...allChannels, newChannel]);
    };

    // channels effect
    useEffect(() => {
        getChannels()
            .then((channels) => setAllChannels(channels))
            .catch((err) => console.log(err));
    }, []);

    // change current channel
    useEffect(() => {
        if (!channelId) return;

        setSelectedChannel(
            allChannels.find((channel) => channel._id === channelId)
        );

        return () => {
            setSelectedChannel(null);
        };
    }, [channelId, allChannels]);

    //
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
                channel={selectedChannel}
                channels={allChannels}
                isMember={isMemberOfSelectedChannel}
                addNewChannel={addNewChannel}
            />
            <MessagePanel
                channel={selectedChannel}
                isMember={isMemberOfSelectedChannel}
                setIsMember={setIsMemberOfSelectedChannel}
            />
        </div>
    );
}
