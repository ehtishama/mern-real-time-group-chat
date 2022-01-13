import { createContext, useState } from "react";
import { retrieveUser, storeUser } from "../helpers/auth";

export const userContext = createContext();

// context provider
export const UserProvider = ({ children }) => {
    // value for context
    const [user, setUser] = useState(retrieveUser());
    
    const updateUser = (user) => {
        setUser(user);
        storeUser(user);
        
    };

    return (
        <userContext.Provider value={{ user, setUser: updateUser }}>
            {children}
        </userContext.Provider>
    );
};
