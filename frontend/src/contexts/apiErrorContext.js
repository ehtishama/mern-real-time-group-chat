import { createContext, useContext, useState } from "react";

// 1. initial value
// 2. Provider
// 3. hook

const apiErrorContext = createContext();
// 1
export function ApiErrorProvider({ children }) {
    // 2
    const [errors, setErrors] = useState([]);

    return (
        <apiErrorContext.Provider value={{ errors, setErrors }}>
            {children}
        </apiErrorContext.Provider>
    );
}

// 3
export function useApiErrors() {
    return useContext(apiErrorContext);
}
