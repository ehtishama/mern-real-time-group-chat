import { useNetworkStatus } from "../contexts/networkStatusContext";

export default function NetworkStatus() {
    const { status } = useNetworkStatus();
    if (status) return null;

    return (
        <div className="absolute bottom-20 right-[50%] translate-x-[50%] p-4 px-8 rounded-2xl shadow-red-900  bg-red-700 text-red-100 text-lg sm:w-[600px]">
            <h2 className="text-center">It seems you're not connected to internet.</h2>
        </div>
    );
}
