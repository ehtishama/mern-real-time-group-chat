import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { attempLogin } from "../services/auth";

export default function LoginForm({ params }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);

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
                } else return resp.json();
            })
            .then(setUser)
            .catch((err) => console.log(err));
    };

    return (
        <div className="text-white bg-dark-200 px-12 py-16 rounded-lg shadow w-[500px]">
            <h2 className=" text-center text-3xl mb-4">Login</h2>

            <div>
                <form onSubmit={handleLogin}>
                    {loginError && (
                        <p className=" text-red-400">
                            Invalid username or password.
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="username"
                        className={`input bg-dark-input ${
                            loginError && "outline-red-500"
                        }`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="password"
                        className={`input bg-dark-input ${
                            loginError && "outline-red-500"
                        }`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        Login{loading && "..."}
                    </button>
                </form>
            </div>
        </div>
    );
}
