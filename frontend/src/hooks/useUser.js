import { useContext } from "react";
import { userContext } from "../contexts/userContext";

// context consumer
export const useUser = () => {
    return useContext(userContext);
};
