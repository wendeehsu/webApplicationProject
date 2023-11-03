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

export const logout = () => {
    resetToken();
}