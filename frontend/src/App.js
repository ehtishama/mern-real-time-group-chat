import "./App.css";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import RequireAuth from "./components/require-auth";
import ROUTES from "./constants/routes";
import RequireUnauth from "./components/require-unauth";
import Logout from "./components/logout";
import { api } from "./lib/axios";
import { useUser } from "./hooks/useUser";
import { ApiErrorHolder } from "./components/api-error-holder";
import { useNetworkStatus } from "./contexts/networkStatusContext";
import NetworkStatus from "./components/network-status";
import Signup from "./pages/signup";

function App() {
    const { user } = useUser();

    if (user && user.token) {
        api.interceptors.request.use((config) => {
            config.headers = {
                authorization: `Bearer ${user.token}`,
            };
            return config;
        });
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={ROUTES.CHANNELS} />} />
                <Route
                    path={ROUTES.CHANNELS}
                    element={<RequireAuth e={<Home />} />}
                >
                    <Route
                        path={ROUTES.CHANNEL}
                        e={<RequireAuth e={<Home />} />}
                    />
                </Route>

                <Route
                    path={ROUTES.LOGIN}
                    element={<RequireUnauth e={<Login />} />}
                />
                <Route
                    path={ROUTES.SIGNUP}
                    element={<RequireUnauth e={<Signup />} />}
                />
                <Route path={ROUTES.LOGOUT} element={<Logout />} />
            </Routes>
            <ApiErrorHolder />
            <NetworkStatus />
        </BrowserRouter>
    );
}

export default App;
