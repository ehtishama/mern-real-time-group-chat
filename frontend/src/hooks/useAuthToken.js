import { useUser } from "../contexts/userContext";

export const useAuthToken = () => {
    const { user } = useUser();
    if (user && user.token) return user.token;
    else return null;
};
