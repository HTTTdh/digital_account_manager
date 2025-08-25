import { getAllThuongHieu as getTH, updateThuongHieu as updateTH, createThuongHieu as createTH } from "../apis/thuonghieu";
import { create } from "zustand";

export const ThuongHieuStore = create((set) => ({
  data: [],
  loading: false,
    error: null,
    getAllThuongHieu: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getTH();    
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
      const response = await createTH(data);
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
      const response = await updateTH(id, data);
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