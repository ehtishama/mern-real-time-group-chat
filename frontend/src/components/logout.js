import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import { useUser } from "../hooks/useUser";

export default function Logout() {
    const { setUser } = useUser();
    const navigate = useNavigate();
    
    useEffect(() => {
        setUser(null);
        navigate(ROUTES.LOGIN);
    }, []);

    return "Logging you out!";
}
