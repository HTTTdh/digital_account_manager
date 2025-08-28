import { getAllCategory, createCategory } from "../apis/category";
import { create } from "zustand";

export const CategoryStore = create((set) => ({
  data: [],

  getAllCategory: async () => {
    try {
      const response = await getAllCategory();
      set({ data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  createCategory: async (data) => {
    try {
      const response = await createCategory(data);
      set((state) => ({data: [...state.data, response]}));
      return response;
    } catch (error) {
      console.log(error.message);
    }
  },
}));
