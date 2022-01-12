import { BASE_URL } from "../constants/api";
import { api } from "../lib/axios";
export function attempLogin(username, password) {
    return fetch(BASE_URL + "/users/login", {
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
