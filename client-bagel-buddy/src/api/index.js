import axios from "axios";

const getBaseUrl = () => {
    let url = "http://localhost:8080/api";
    if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
        url = "https://bagelbuddy-backend.vercel.app/api";
    }
    console.log("process.env.NODE_ENV ->", process.env.NODE_ENV);
    return url;
}

export const agent = axios.create({
    baseURL: getBaseUrl(),
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