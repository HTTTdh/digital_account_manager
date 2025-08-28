import {
  createNotification,
  getNotificationByUser,
} from "../apis/notification";
import { create } from "zustand";

export const NotificationStore = create((set) => ({
  data: [],

  getNotificationByUser: async () => {
    try {
      const response = await getNotificationByUser();
      set({ data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  createNotification: async (data) => {
    try {
      const response = await createNotification(data);
      set((state) => ({
        data: [...state.data, response],
      }));
      return response;
    } catch (error) {
      console.log(error);
    }
  },
}));