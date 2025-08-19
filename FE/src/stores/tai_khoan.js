import { findforLevel2, getPhongBan, themTaiKhoan } from "../apis/tai_khoan";
import { create } from "zustand";

export const UserStore = create((set) => ({
  data: [],
  loading: false,
  error: null,

  findforLevel2: async () => {
    try {
      set({ loading: true, error: null });
      const res = await findforLevel2();
      // console.log("Tai khoan data:", res);
      set({ loading: false, data: res.data });
      return res.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error(error);
    }
  },

  getPhongBan: async () => {
    try {
      set({ loading: true, error: null });
      const res = await getPhongBan();
      //   console.log("Phong ban data:", res);
      set({ loading: false, data: res.data });
      return res.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.error(error);
    }
  },
  themTaiKhoan: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await themTaiKhoan(data);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error.message);
    }
  },
}));
