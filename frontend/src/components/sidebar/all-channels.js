import PlusIcon from "../../icons/plus";
import SearchIcon from "../../icons/search";
import Channel from "./channel";

export function AllChannels({handleCreateBtnClick, onChannelClick}) {
    return <>
        {/* heading */}
        <div className="flex justify-between items-center h-12 shadow shadow-black px-8">
            <h2 className="font-medium">Channels</h2>
            <button
                className="h-6 w-6 rounded bg-dark-200 hover:bg-dark-hover flex items-center justify-center font-bold"
                onClick={handleCreateBtnClick}>
                <PlusIcon/>
            </button>
        </div>
        {/* search */}
        <div className="px-8 space-y-8">
            <div className="relative">
                <SearchIcon className="absolute top-2 left-2"/>
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-dark-input text-sm w-full rounded-md p-2 pl-8 placeholder:text-gray-200"
                />
            </div>
        </div>
        {/* list of channels */}
        <Channel className={"px-8 py-2"} onClick={onChannelClick}/>
    </>;
}