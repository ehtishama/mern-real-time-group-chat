import { Navigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import { useUser } from "../hooks/useUser";

export default function RequireAuth({ e }) {
    const { user } = useUser();
    if (user) return e;
    return <Navigate to={ROUTES.LOGIN} />;
}
