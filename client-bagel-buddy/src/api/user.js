import { agent, setToken } from "./index.js";

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
