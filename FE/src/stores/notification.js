import {
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

}));