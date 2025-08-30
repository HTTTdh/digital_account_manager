import { create } from "zustand";
import { getActivityHistory } from "../apis/activity";
export const activityHistory = create((set) => ({
    data: [],

    getAllHistory: async (filters = {}, page = 1) => {
        try {
            console.log(filters, page)
            const response = await getActivityHistory(filters, page);
            set({  data: response });
            return response;
        }
        catch (error) {
            console.log(error.message);
        }
    },
}))