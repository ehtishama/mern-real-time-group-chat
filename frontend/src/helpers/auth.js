export function storeUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function retrieveUser(user) {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        return null;
    }
}
