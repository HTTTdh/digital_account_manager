import { create } from "zustand";
import { getAllPersonalLogs } from "../apis/PersonalLog";

export const PersonalLogStore = create((set) => ({
  data: [],


  getPersonalLogById: async (page) => {
    try {
      const response = await getAllPersonalLogs(page);
      set({ data: response });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  },
}));
