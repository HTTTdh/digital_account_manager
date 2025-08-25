import { create } from "zustand";
import { getActivityHistory } from "../apis/activityHistory";
export const activityHistory = create((set) => ({
    data: [],
    loading: false,
    error: null,

    getAllHistory: async (filters, page) => {
        try {
            set({ loading: true, error: null });
            const response = await getActivityHistory(filters, page);
            set({ loading: false, data: response.data });
            return response.data;
        }
        catch (error) {
            set({ loading: false, error: error.message });
            console.log(error.message);
        }
    },
}))