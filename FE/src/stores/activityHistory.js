import { create } from "zustand";
import { getActivityHistory } from "../apis/activityHistory";
export const activityHistory = create((set) => ({
    data: [],

    getAllHistory: async (filters, page) => {
        try {
            const response = await getActivityHistory(filters, page);
            set({  data: response });
            return response;
        }
        catch (error) {
            console.log(error.message);
        }
    },
}))