import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import { Formik } from "formik";
import { createNewUser } from "../services/auth";
import { useApiErrors } from "../contexts/apiErrorContext";
import { storeUser } from "../helpers/auth";

export default function SignupForm() {
    const { errors, setErrors } = useApiErrors();
    const navigate = useNavigate();

    const handleSignup = (user) => {
        createNewUser(user)
            .then((resp) => {
                const { data: user } = resp;
                storeUser(user);
                navigate(ROUTES.CHANNELS);
            })
            .catch((error) => {
                const key = Date.now();
                const {
                    response: {
                        data: { name, message, status },
                    },
                } = error;

                setErrors([...errors, { name, message, key, status }]);
            });
    };

    return (
        <div className="text-white bg-dark-200 px-12 py-16 rounded-lg shadow max-w-screen-sm mx-auto">
            <h2 className=" text-center text-3xl mb-4">Login</h2>

            <div>
                <Formik
                    initialValues={{
                        firstname: "",
                        lastname: "",
                        email: "",
                        avatarUrl: "",
                        username: "",
                        password: "",
                    }}
                    onSubmit={handleSignup}
                >
                    {({ values, handleChange, handleSubmit }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="gap-1">
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={values.firstname}
                                        placeholder="firstname"
                                        className={`input bg-dark-input`}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        type="text"
                                        placeholder="lastname"
                                        className={`input bg-dark-input `}
                                        name="lastname"
                                        value={values.lastname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        placeholder="email"
                                        className={`input bg-dark-input `}
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        type="url"
                                        placeholder="avatar url"
                                        className={`input bg-dark-input `}
                                        name="avatarUrl"
                                        value={values.avatarUrl}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="username"
                                    className={`input bg-dark-input`}
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="password"
                                    className={`input bg-dark-input`}
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                >
                                    Register
                                </button>
                            </form>
                        );
                    }}
                </Formik>

                <p className="mt-3 flex gap-1 justify-end text-sm">
                    Already have an account?
                    <Link to={ROUTES.LOGIN}>
                        <span className="text-blue-400 font-medium underline underline-offset-1">
                            Login
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
}
