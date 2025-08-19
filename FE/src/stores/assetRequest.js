import { create } from "zustand";
import {
  createAssetRequest,
  getAllAssetRequest,
  updateStatusAssetRequest,
} from "../apis/assetRequest";

export const AssetRequestStore = create((set) => ({
  data: [],
  loading: false,
  error: null,

  getAllAssetRequest: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAllAssetRequest();
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },

  createAssetRequest: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await createAssetRequest(data);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },

  updateStatusAssetRequest: async (id, data) => {
    try {
      // console.log(id);
      // console.log(data);

      set({ loading: true, error: null });
      const response = await updateStatusAssetRequest(id, data);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },
}));
