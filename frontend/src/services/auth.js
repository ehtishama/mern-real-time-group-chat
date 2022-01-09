import { api } from "../lib/axios";
export function attempLogin(username, password) {
    return fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "content-type": "application/json",
        },
    });
}

export function createNewUser(user) {
    return api.post("/users/signup", user);
}
