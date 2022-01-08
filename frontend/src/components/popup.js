import CancelIcon from "../icons/cancel";

export default function Popup({ text, onCancelClick }) {
    return (
        <div className="relative z-50 flex gap-2 justify-between items-center max-w-sm mx-auto rounded shadow bg-red-700 p-3 px-4 text-white">
            <p>
                {text}
            </p>
            <button onClick={onCancelClick}>
                <CancelIcon />
            </button>
        </div>
    );
}
