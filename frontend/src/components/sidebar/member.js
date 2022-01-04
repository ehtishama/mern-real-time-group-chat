export default function Member({className}) {
    return (
        <div
            class={`flex gap-2 items-center cursor-pointer select-none hover:bg-dark-hover ${className}`}
        >
            <div className="h-8 w-8 rounded bg-dark-200 flex items-center justify-center">
                <img src={"https://randomuser.me/api/portraits/women/90.jpg"}
                     className="h-8 w-8 rounded" alt={"User profile"}/>
            </div>

            <h2 className="text-gray-400 font-medium text-sm">Annalise Huynh</h2>
        </div>
    );
}
