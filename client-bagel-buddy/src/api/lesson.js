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

export const getPendingLesson = async () => {
    try {
        let token = getToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        let { data } = await agent.get(`/lesson/pending`, config);
        return { success: true, data: data.data };

    } catch (error) {
        return { success: false, message: error.message };
    };
}

export const createLesson = async (teacherId, timeslotStart, note = "") => {
    try {
        let token = getToken();
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };
        let { data } = await agent.post(`/lesson`, {
            teacherId, timeslotStart, note
        }, config);
        return { success: true, data: data.data };

    } catch (error) {
        return { success: false, message: error.message };
    };
}