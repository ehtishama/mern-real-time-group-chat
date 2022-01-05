import { Link } from "react-router-dom";

export default function Channel({ className, onClick, channel }) {
    return (
        <Link to={channel._id}>
            <div
                className={`flex gap-2 items-center cursor-pointer select-none hover:bg-dark-hover ${className}`}
            >
                <div className="h-8 w-8 rounded bg-dark-200 flex items-center justify-center">
                    <p className="font-medium tracking-wide text text-sky-500">
                        {channel.name
                            .split(" ")
                            .splice(0, 2)
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}
                    </p>
                </div>

                <h2 className="uppercase text-sm">{channel.name}</h2>
            </div>
        </Link>
    );
}
