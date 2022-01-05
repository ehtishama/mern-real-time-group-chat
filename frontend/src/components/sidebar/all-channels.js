import PlusIcon from "../../icons/plus";
import SearchIcon from "../../icons/search";
import Channel from "./channel";

export function AllChannels({
    handleCreateBtnClick,
    channels,
}) {
    return (
        <>
            {/* heading */}
            <div className="flex justify-between items-center h-12 shadow shadow-black px-8">
                <h2 className="font-medium">Channels</h2>
                <button
                    className="h-6 w-6 rounded bg-dark-200 hover:bg-dark-hover flex items-center justify-center font-bold"
                    onClick={handleCreateBtnClick}
                >
                    <PlusIcon />
                </button>
            </div>
            {/* search */}
            <div className="px-6 space-y-8">
                <div className="relative">
                    <SearchIcon className="absolute top-2 left-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-dark-input text-sm w-full rounded-md p-2 pl-8 placeholder:text-gray-200"
                    />
                </div>
            </div>
            <div className="overflow-auto">
                {/* list of channels */}
                {channels.map((channel) => (
                    <Channel
                        key={channel._id}
                        className={"px-6 py-2"}
                        channel={channel}
                    />
                ))}
            </div>
        </>
    );
}