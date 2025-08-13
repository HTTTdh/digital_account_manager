import { create } from "zustand";
import { register, login } from "../apis/auth";

export const AuthStore = create((set) => ({
  data: [],
  error: null,
  loading: false,

  register: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await register(data);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  login: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await login(data);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
}));
