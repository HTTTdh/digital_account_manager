import { create } from "zustand";
import { getAllPersonalLogs } from "../apis/PersonalLog";

export const PersonalLogStore = create((set) => ({
    data: [],
    loading: false,
    error: null,
    // getAllPersonalLogs: async (filters) => {
    //     try {
    //         set({ loading: true, error: null });
    //         const response = await getHanhDong(filters);
    //         set({ loading: false, data: response.data });
    //         return response.data;
    //     }
    //     catch (error) {
    //         set({ loading: false, error: error.message });
    //         console.log(error.message);
    //     }
    // },

    getPersonalLogById: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllPersonalLogs();
            console.log(response.data);
            set({ loading: false, data: response.data });
            return response.data;
        }
        catch (error) {
            set({ loading: false, error: error.message });
            console.log(error.message);
        }
    },

}));