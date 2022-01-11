import LoadingIcons from "../icons/loading";

export default function InfiniteProgress({ className }) {
    return (
        <span className={`text-green-500 text-5xl animate-spin ${className}`}>
            <LoadingIcons />
        </span>
    );
}
