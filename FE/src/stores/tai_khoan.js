import { findforLevel1, themTaiKhoan, suaTaiKhoan} from "../apis/tai_khoan";
import { create } from "zustand";
import { assetPrivate, findforLevel2 } from "../apis/user";
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

    findforLevel1: async () => {
        try {
            const res = await findforLevel1();
            set({ data: res });
            return res;
        } catch (error) {
            console.error(error);
        }
    },
    findforLevel2: async () => {
        try {
            const res = await findforLevel2();
            set({ data: res });
            return res;
        } catch (error) {
            console.error(error);
        }
    },
    themTaiKhoan: async (data) => {
        try {
            const response = await themTaiKhoan(data);
            set((state) => ({
        data: [...state.data, response],
      }));
            return response;
        } catch (error) {
            console.log(error.message);
        }
    },
    suaTaiKhoan: async (id, data) => {
        try {
            const response = await suaTaiKhoan(id, data);
            set((state) => ({
        data: state.data.map((item) =>
        (item.id === id ? response : item)
        )
      }));

            return response;
        } catch (error) {
            console.log(error.message);
        }
    },
}));
