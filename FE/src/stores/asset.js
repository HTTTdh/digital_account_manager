import { create } from "zustand";
import {
  getAllAsset,
  getAssetByIdCategory,
  createAsset,
  updateAsset,
  deleteAsset,
} from "../apis/asset";

export const AssetStore = create((set) => ({
  data: [],
  loading: false,
  error: null,

  getAllAsset: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAllAsset();
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error.message);
    }
  },

  getAssetByIdCategory: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await getAssetByIdCategory(id);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  createAsset: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await createAsset(data);
      set((state) => ({
        loading: false,
        data: [...state.data, response.data.data],
      }));

      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  updateAsset: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const response = await updateAsset(id, data);
      set((state) => ({
        loading: false,
        data: state.data.map((item) =>
          item.id === id ? { ...item, ...response.data } : item
        ),
      }));

      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  deleteAsset: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await deleteAsset(id);
      set({
        loading: false,
        data: [...state.data, response.data.filter((item) => item.id !== id)],
      });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },
}));
