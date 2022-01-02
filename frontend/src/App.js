import "./App.css";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import RequireAuth from "./components/require-auth";
import ROUTES from "./constants/routes";
import RequireUnauth from "./components/require-unauth";
import Logout from "./components/logout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={ROUTES.HOME}
                    element={<RequireAuth e={<Home />} />}
                />
                <Route
                    path={ROUTES.LOGIN}
                    element={<RequireUnauth e={<Login />} />}
                />
                <Route path={ROUTES.LOGOUT} element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
