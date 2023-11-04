import { agent, getToken, setToken, resetToken } from "./index.js";

export const login = async (email, password) => {
    try {
        let body = { email, password };
        let { data } = await agent.post(`/user/auth/login`, body);
        setToken(data.token);
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    };
}

export const register = async (
    email,
    password,
    role,
    imgUrl,
    username,
    language,
    skills = [],
    timeslots = []) => {
    try {
        let body = {
            name: username,
            native_language: language,
            img_url: imgUrl,
            type: role,
            email,
            password,
            skills,
            timeslots
        };
        let { data } = await agent.post(`/user/auth/register`, body);
        setToken(data.token);
        return { success: true, data: data.data };
    } catch (error) {
        return { success: false, message: error.message };
    };
}

export const getProfile = async () => {
    try {
        let token = getToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        let { data } = await agent.get(`/user/profile`, config);
        return { success: true, data: data.data };

    } catch (error) {
        return { success: false, message: error.message };
    };
}

export const getAllTeachers = async () => {
    try {
        let { data } = await agent.get(`/user?type=1`);
        return { success: true, data: data.data };
    } catch (error) {
        return { success: false, message: error.message };
    };
}

export const logout = () => {
    resetToken();
}