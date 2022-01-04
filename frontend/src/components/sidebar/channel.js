export default function Channel({ className, onClick }) {
    return (
        <div
            class={`flex gap-2 items-center cursor-pointer select-none hover:bg-dark-hover ${className}`}
            onClick={onClick}
        >
            <div className="h-8 w-8 rounded bg-dark-200 flex items-center justify-center">
                <p className="font-medium tracking-wide text text-sky-500">FD</p>
            </div>

            <h2 className="uppercase text-sm">Frontend Developers</h2>
        </div>
    );
}
