import { findforLevel1, themTaiKhoan as them, suaTaiKhoan } from "../apis/tai_khoan";
import { create } from "zustand";
import { findforLevel2 as level2 } from "../apis/tai_khoan";

export const UserStore = create((set, get) => ({
  dataLevel1: [],
  dataLevel2: [],

  findforLevel1: async () => {
    try {
      const res = await findforLevel1();
      set({ dataLevel1: res });
      return res;
    } catch (error) {
      console.error(error);
    }
  },

  findforLevel2: async () => {
    try {
      const res = await level2();
      set({ dataLevel2: res });
      return res;
    } catch (error) {
      console.error(error);
    }
  },

   themTaiKhoan: async (data) => {
  try {
    const response = await axios.post("/api/auth/register", data);
    return response.data; // dữ liệu thành công từ server
  } catch (error) {
    console.error("Lỗi API:", error.response?.data || error.message);
    // Trả về object giống format của server để FE xử lý
    return error.response?.data || { success: false, error: "Lỗi server" };
  }
},


  suaTaiKhoan: async (id, data) => {
    try {
      const response = await suaTaiKhoan(id, data);
        set((state) => ({
            dataLevel1: [...state.dataLevel1, data],
            dataLevel2: [...state.dataLevel2, data],
        }));
      return response;
    } catch (error) {
      console.log(error.message);
    }
  },
}));
