import SignupForm from "../components/signup-form";

export default function Signup() {
    return (
        <div className="min-h-screen bg-dark-100 flex flex-col items-center justify-center">
            <div className="w-full">
                <SignupForm />
            </div>
        </div>
    );
}
