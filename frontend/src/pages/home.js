import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessagePanel from "../components/message-panel";
import Sidebar from "../components/sidebar";
import { getChannels } from "../services/api";

export default function Home() {
    const { channelId } = useParams();

    const [allChannels, setAllChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);

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
    }, [channelId, allChannels]);

    return (
        <div className="flex">
            <Sidebar channel={selectedChannel} channels={allChannels} />
            <MessagePanel channel={selectedChannel} />
        </div>
    );
}
