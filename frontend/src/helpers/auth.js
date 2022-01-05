export function storeUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function retrieveUser() {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        return null;
    }
}

export function removeUser() {
    localStorage.removeItem("user");
}
