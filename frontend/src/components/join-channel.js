import { useDispatch } from "react-redux";
import { useUser } from "../hooks/useUser";
import { joinChannel } from "../services/api";
import { addMember } from "../store/channelsSlice";

export default function JoinChannel({
    channel    
}) {
    const { user } = useUser();
    const dispatch = useDispatch();

    const handleJoinChannelClick = async () => {
        try {
            await joinChannel(channel._id, user);
            dispatch(
                addMember({ channelId: channel._id, newMember: user._id })
            );
        } catch (e) {
            console.log(e);
        }
    };

    if (!channel) return "";
    return (
        <div className="m-6">
            <div className="max-w-screen-sm mx-auto p-8 bg-dark-hover rounded-2xl shadow border border-gray-700 space-y-3">
                <h2 className="font-medium text-lg">{channel.name}</h2>
                <p className="text-gray-300">{channel.summary}</p>
                <section className="flex justify-end gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={handleJoinChannelClick}
                    >
                        Join
                    </button>
                    <button className="btn">Cancel</button>
                </section>
                <p className="text-right text-red-400 text-xs pt-2 ">
                    You must join a channel before you could see messages.*
                </p>
            </div>{" "}
        </div>
    );
}
