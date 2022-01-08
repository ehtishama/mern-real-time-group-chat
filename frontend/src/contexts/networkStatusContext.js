import { createContext, useContext, useEffect, useState } from "react";
const networkStatusContext = createContext();

export function NetworkStatusProvider({ children }) {
    const [status, setStatus] = useState(navigator.onLine);

    useEffect(() => {
        
        window.addEventListener("online", () => setStatus(true));
        window.addEventListener("offline", () => setStatus(false));
    }, []);
    return (
        <networkStatusContext.Provider value={{ status, setStatus }}>
            {children}
        </networkStatusContext.Provider>
    );
}

export function useNetworkStatus() {
    return useContext(networkStatusContext);
}
