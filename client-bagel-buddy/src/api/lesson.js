import { agent, getToken } from "./index.js";

export const getUpcomingLesson = async () => {
    try {
        let token = getToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        let { data } = await agent.get(`/lesson/upcoming`, config);
        return { success: true, data: data.data };

    } catch (error) {
        return { success: false, message: error.message };
    };
}