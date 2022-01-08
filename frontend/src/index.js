import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/userContext";
import { ApiErrorProvider } from "./contexts/apiErrorContext";
import { NetworkStatusProvider } from "./contexts/networkStatusContext";
ReactDOM.render(
    <React.StrictMode>
        <NetworkStatusProvider>
            <ApiErrorProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </ApiErrorProvider>
        </NetworkStatusProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
