import axios from "axios";

export const agent = axios.create({
    baseURL: "http://localhost:8080/api",
});

export const setToken = (token) => {
    window.sessionStorage.setItem("token", token);
}

export const getToken = () => {
    return window.sessionStorage.getItem("token");
}