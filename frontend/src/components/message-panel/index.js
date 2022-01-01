import PaperPlane from "../../icons/paper-plane";
import Message from "./message";

export default function MessagePanel() {
    return (
        <div class="text-gray-200 h-screen bg-dark-200 w-full">
            <div className="flex flex-col h-full">
                {/* header */}
                <div class="px-16 py-4 h-12 shadow-sm shadow-black flex items-center">
                    <h2 class="font-medium">Frontend Developers</h2>
                </div>
                {/* messages */}
                <div class="overflow-auto" style={{ flexGrow: 1}}>
                    <div>
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                        <Message className={"px-12"} />
                    </div>
                </div>
                {/* new message input */}
                <div className="my-6 px-12">
                    <div className="px-3 py-1 pr-1 shadow rounded-lg bg-dark-input">
                        <form action="">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className="bg-transparent text-sm outline-none w-full"
                                    placeholder="Write new message"
                                />
                                <button className="bg-blue-500 shadow hover:shadow-sm hover:bg-blue-600 rounded-lg text-white text-sm p-2">
                                    <PaperPlane className={"rotate-90"} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
