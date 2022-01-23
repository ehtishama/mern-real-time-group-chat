import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ROUTES from "../constants/routes";
import { useUser } from "../hooks/useUser";

export default function Logout() {
    const { setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(null);
        navigate(ROUTES.LOGIN);
    }, [navigate, setUser]);

    return "Logging you out!";
}
