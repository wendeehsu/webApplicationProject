import axios from "axios";

export const agent = axios.create({
    baseURL: "http://localhost:8080/api",
});

export const setToken = (token) => {
    window.sessionStorage.setItem("token", token);
}

export const getToken = () => {
    let token = window.sessionStorage.getItem("token");
    if (token === '' || token === undefined) {
        throw ({message: "Login session expired. Please log in again"});
    }
    return token;
}

export const resetToken = () => {
    return window.sessionStorage.removeItem("token");
}