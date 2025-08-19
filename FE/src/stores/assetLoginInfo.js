import {
  getAllAssetLoginInfo,
  createAssetLoginInfo,
  assetRecovery,
  getAssetLoginInfoPrivate,
} from "../apis/assetLoginInfo";
import { create } from "zustand";

export const AssetLoginInfoStore = create((set) => ({
  data: [],
  loading: false,
  error: null,

  getAllAssetLoginInfo: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAllAssetLoginInfo();
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },

  getAssetLoginInfoPrivate: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAssetLoginInfoPrivate();
      console.log("Response from getAssetLoginInfoPrivate:", response);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },

  createAssetLoginInfo: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await createAssetLoginInfo(data);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
}));
