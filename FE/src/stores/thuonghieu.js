import { getAllThuongHieu as getTH, updateThuongHieu as updateTH, createThuongHieu as createTH, deleteThuongHieu as DelTH } from "../apis/thuonghieu";
import { create } from "zustand";

export const ThuongHieuStore = create((set) => ({
  data: [],       // lưu danh sách thương hiệu
  loading: false,

  getAllThuongHieu: async () => {
    try {
      const response = await getTH();
      set({ data: response.data }); // cập nhật state
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  createThuongHieu: async (data) => {
    try {
      const response = await createTH(data);
      set((state)=>({data: [...state.data, response.data]}))
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  updateThuongHieu: async (id, data) => {
    try {
      const response = await updateTH(id, data);
      set((state) => ({
        data: state.data.map((item) => (item.id === id ? response.data : item))
      }));
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },

  deleteThuongHieu: async (id) => {
    try {
      const response = await DelTH(id);
      set((state) => ({
      data: state.data.filter((item) => item.id !== id),
    }));
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
}));
