import { createPortal } from "react-dom";
import { useApiErrors } from "../contexts/apiErrorContext";
import Popup from "./popup";

export function ApiErrorHolder() {
    const { errors, setErrors } = useApiErrors();

    const errorPopups = errors.map((error) => (
        <Popup
            text={error.message}
            key={error.key}
            onCancelClick={() => {
                setErrors(errors.filter((_error) => _error.key !== error.key));
            }}
        />
    ));

    return createPortal(
        <div className="absolute top-0 right-0 w-[400px] space-y-2">
            {errorPopups}
        </div>,
        document.getElementById("popups")
    );
}
