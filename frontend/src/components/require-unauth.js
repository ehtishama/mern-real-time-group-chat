import { Navigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import { useUser } from "../hooks/useUser";

export default function RequireUnauth({ e }) {
    const { user } = useUser();
    if (user) return <Navigate to={ROUTES.CHANNELS} />;
    else return e;
}
