import { findforLevel2, themTaiKhoan, suaTaiKhoan} from "../apis/tai_khoan";
import { create } from "zustand";
import { assetPrivate } from "../apis/user";
export const UserStore = create((set) => ({
    data: [],
    // xem tai san ca nhan 
    assetPrivate: async () => {
    try {
      const response = await assetPrivate();
      set({data: response });
      return response;
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllUser: async () => {
    try {
      const response = await getAllUser();
      set({  data: response });
      return response;
    } catch (error) {
      console.log(error.message);
    }
    },
  
    findforLevel2: async () => {
        try {
            const res = await findforLevel2();
            set({  data: res });
            return res;
        } catch (error) {
            console.error(error);
        }
    },

    themTaiKhoan: async (data) => {
        try {
            const response = await themTaiKhoan(data);
            set({ data: response });
            return response;
        } catch (error) {
            console.log(error.message);
        }
    },
    suaTaiKhoan: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const response = await suaTaiKhoan(id, data);
            set({ loading: false, data: response });
            return response;
        } catch (error) {
            set({ loading: false, error: error.message });
            console.log(error.message);
        }
    },
}));
