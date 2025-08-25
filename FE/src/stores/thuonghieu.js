import { getAllThuongHieu, updateThuongHieu, createThuongHieu } from "../apis/thuonghieu";
import { create } from "zustand";

export const ThuongHieuStore = create((set) => ({
  data: [],
  loading: false,
    error: null,
    getAllThuongHieu: async () => {
    try {
      set({ loading: true, error: null });
            const response = await getAllThuongHieu();    
            set({ loading: false, data: response.data });
            return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
        }
    },

    createThuongHieu: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await createThuongHieu(data);
      set({ loading: false, data: response.data });
      return response.data;
        }
    catch (error) {
      set({ loading: false, error: error.message });
      console.log(error.message);
        }
    },

    updateThuongHieu: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const response = await updateThuongHieu(id, data);
      set({ loading: false, data: response.data });
      return response.data;
        }
    catch (error) {
      set({ loading: false, error: error.message });
      console.log(error.message);
        }
  },
  deleteThuongHieu: async (id) => {
    try {
      set({ loading: true, error: null });
      await deleteThuongHieu(id);
      set((state) => ({
        data: state.data.filter((brand) => brand.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error.message);
    }
  },
}));