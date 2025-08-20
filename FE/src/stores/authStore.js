import { create } from "zustand";
import { register, login, logout, getAllUser } from "../apis/auth";
import { assetPrivate } from "../apis/user";
import { clearLocalStorage, setLocalStorage } from "../utils/localStorage";
import Cookies from "js-cookie";

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
      const resData = response.data;
      if (resData.user && resData.user.password) {
        delete resData.user.password;
      }
      setLocalStorage("user", resData.user);
      setLocalStorage("accessToken", resData.token);
      Cookies.set("accessToken", resData.token, {
        expires: 1,
        secure: false,
        sameSite: "strict",
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      const response = await logout();
      set({ loading: false, data: response.data });
      clearLocalStorage();
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error.message);
    }
  },

  assetPrivate: async () => {
    try {
      set({ loading: true, error: null });
      const response = await assetPrivate();
      set({ loading: false, data: response.data });
      // console.log(response);
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error.message);
    }
  },

  getAllUser: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAllUser();
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error.message);
    }
  },
}));
