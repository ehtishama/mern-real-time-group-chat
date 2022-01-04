import ArrowBack from "../../icons/arrow-back";
import Member from "./member";

export default function SelectedChannel({onBackClick}) {
    const padding = 6;

    return (
        <>
            {/* heading */}
            <div className={`flex items-center gap-3 h-12 shadow shadow-black px-${padding}`}>
                <button
                    className="h-6 w-6 rounded bg-dark-200 hover:bg-dark-hover flex items-center justify-center font-bold"
                    onClick={onBackClick}
                >
                    <ArrowBack/>
                </button>
                <h2 className="font-medium">All channels</h2>
            </div>
            {/* Selected channel info */}
            <div className={`px-${padding} space-y-8`}>

                <div className="space-y-2">
                    <h2 className={"font-medium uppercase"}>Front-end Developers</h2>
                    <p className={"text-sm text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Consectetur earum est impedit quaerat quod.</p>
                </div>

            </div>

            {/* list of members */}
            <div>
                <div className={"mt-3"}/>
                <h2 className={"px-6 font-medium uppercase"}>Members</h2>
                <Member className={"px-6 py-2"}/>
                <Member className={"px-6 py-2"}/>
                <Member className={"px-6 py-2"}/>
                <Member className={"px-6 py-2"}/>
                <Member className={"px-6 py-2"}/>
                <Member className={"px-6 py-2"}/>
            </div>
        </>
    )

}
