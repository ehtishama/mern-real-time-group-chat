export default function Message({ className }) {
    return (
        <div className={`flex gap-6 py-4 ${className}`}>
            <div className="w-8 h-8 shrink-0 rounded shadow overflow-hidden">
                <img
                    src="https://randomuser.me/api/portraits/men/85.jpg"
                    alt="Profile"
                />
            </div>

            <div>
                <div className="flex gap-2 items-center text-gray-400">
                    <h3 className="text font-medium">Nelli Francis</h3>
                    <p className="text-xs">yesterday at 14:02</p>
                </div>

                <p className="text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Asperiores, fugiat molestiae.  😁
                </p>
            </div>
        </div>
    );
}
