import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewChannel } from "../../services/api";
import { addChannel } from "../../store/channelsSlice";

export default function Modal({ open, setOpen }) {
    const [channelName, setChannelName] = useState("");
    const [channelSummary, setChannelSummary] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newChannel = { name: channelName, summary: channelSummary };
        try {
            const channel = await createNewChannel(newChannel);
            dispatch(addChannel(channel));
            setOpen(false);
            navigate("/channels/" + channel._id);
        } catch (e) {
            console.error(e);
        }
    };

    if (!open) return null;

    return (
        <div>
            <div
                className="shadow-md absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center"
                onClick={() => setOpen(false)}
            >
                <div
                    className="bg-dark-100 p-8 rounded-3xl w-[650px]"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <h2 className="font-medium">New channel</h2>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Channel name"
                                    onChange={(e) =>
                                        setChannelName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    rows="3"
                                    placeholder="Channel description"
                                    className="w-full bg-dark-input rounded-md mb-4 p-3"
                                    onChange={(e) =>
                                        setChannelSummary(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
