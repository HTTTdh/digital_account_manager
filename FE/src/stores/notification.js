import {
  createNotification,
  getNotificationByUser,
} from "../apis/notification";
import { create } from "zustand";

export const NotificationStore = create((set) => ({
  data: [],
  loading: false,
  error: null,

  getNotificationByUser: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getNotificationByUser();
      set({ data: response.data, loading: false, error: null });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },

  createNotification: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await createNotification(data);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },
}));
