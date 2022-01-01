import LogoutIcon from "../../icons/logout";
import PlusIcon from "../../icons/plus";
import SearchIcon from "../../icons/search";
import UserIcon from "../../icons/user";
import Channel from "./channel";
import ChevronDown from "./chevron-down";

export default function Sidebar() {
    return (
        <div className="shrink-0 text-gray-50 h-screen w-72 bg-dark-100 space-y-4 flex flex-col">
            {/* heading */}
            <div className="flex justify-between items-center h-12 shadow shadow-black px-8">
                <h2 className="font-semibold">Channels</h2>
                <button className="h-6 w-6 rounded bg-dark-200 hover:bg-dark-hover flex items-center justify-center font-bold">
                    <PlusIcon />
                </button>
            </div>
            {/* search */}
            <div className="px-8 space-y-8">
                <div className="relative">
                    <SearchIcon className="absolute top-2 left-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-dark-input text-sm w-full rounded-md p-2 pl-8 placeholder:text-gray-200"
                    />
                </div>
            </div>
            {/* list of channels */}
            <Channel className={"px-8 py-2"} />

            {/* profile */}
            <div
                style={{ marginTop: "auto" }}
                className="bg-dark-50 py-3 px-4 flex items-center gap-3 relative cursor-pointer hover:bg-dark-hover"
            >
                <div className="rounded-md shadow overflow-hidden">
                    <img
                        src="https://randomuser.me/api/portraits/men/47.jpg"
                        alt="Profile"
                        className="h-10 w-10"
                    />
                </div>

                <p className="font-medium select-none">Xanthe Neal</p>

                <ChevronDown className={"ml-auto"} />

                {/* popup */}
                <div className="absolute bottom-14 right-2 p-3 rounded-md border border-neutral-600 bg-dark-200 w-44">
                    <ul>
                        <li className="cursor-pointer hover:bg-dark-hover select-none rounded-md">
                            <div className="flex items-center gap-2 p-2 ">
                                <UserIcon />
                                <span className="text">My Profile</span>
                            </div>
                        </li>
                        <div className="h-0.5 bg-gray-500 my-4 mx-2"></div>
                        <li>
                            <div className="flex items-center gap-2 px-2 py-1 text-red-400">
                                <LogoutIcon />
                                <span className="text-sm font-medium">Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
