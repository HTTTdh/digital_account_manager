import { getAllCategory, createCategory } from "../apis/category";
import { create } from "zustand";

export const CategoryStore = create((set) => ({
  data: [],
  loading: false,
  error: null,

  getAllCategory: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAllCategory();
      console.log("Categories fetched successfully:", response.data);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },

  createCategory: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await createCategory(data);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error.message);
    }
  },
}));
