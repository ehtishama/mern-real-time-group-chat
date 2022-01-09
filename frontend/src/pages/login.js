import LoginForm from "../components/login-from";

export default function Login() {
    return (
        <div className="min-h-screen bg-dark-100 flex flex-col items-center justify-center">
            <LoginForm />
        </div>
    );
}

// Authentication in React
// => react app start
// => read storage (local, session)
// => if user not logged in redirect to /login
// => else store user in context and continue
//
// => when user loggs in
// => store the token in storage
// => update the context
// => redirect to the dashboard
//
