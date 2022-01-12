import { useState } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../constants/routes";
import { useUser } from "../hooks/useUser";
import LoadingIcons from "../icons/loading";
import { attempLogin } from "../services/auth";
import InfiniteProgress from "./infinite-progress";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const { setUser } = useUser();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError(() => false);
        setLoading(() => true);

        attempLogin(username, password)
            .then(
                (resp) =>
                    new Promise((res) => setTimeout(() => res(resp), 2000))
            )
            .then((resp) => {
                setLoading(false);
                if (resp.status === 401) {
                    setLoginError(true);
                    return null;
                }
                setLoginSuccess(true);
                return resp.json();
            })
            .then(
                (resp) =>
                    new Promise((res) => setTimeout(() => res(resp), 2000))
            )
            .then(setUser)
            .catch((err) => console.log(err));
    };

    return (
        <>
            {loginSuccess ? (
                <InfiniteProgress />
            ) : (
                <div className="text-white bg-dark-200 px-12 py-16 rounded-lg shadow w-[500px]">
                    <h2 className=" text-center text-3xl mb-6">Login</h2>

                    <div>
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="username"
                                className={`input bg-dark-input ${
                                    loginError &&
                                    "border border-red-800 shadow shadow-red-800"
                                }`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="password"
                                className={`input bg-dark-input ${
                                    loginError &&
                                    "border border-red-800 shadow shadow-red-800"
                                }`}
                                value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                required
                            />
                            {loginError && (
                                <p className=" mb-3 text-red-600">
                                    Invalid username or password.
                                </p>
                            )}
                            <button
                                className="btn btn-primary w-full flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <LoadingIcons />
                                ) : (
                                    <span>Login</span>
                                )}
                            </button>
                        </form>

                        <p className="text-sm mt-3 flex gap-1 justify-end">
                            Don't have an account?
                            <Link to={ROUTES.SIGNUP}>
                                <span className="text-blue-400 font-medium underline underline-offset-1">
                                    Register
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
