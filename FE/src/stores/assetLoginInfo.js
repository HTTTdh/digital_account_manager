import {
  getAllAssetLoginInfo,
  createAssetLoginInfo,
  assetRecovery,
  getAssetLoginInfoPrivate,
  getAssetLoginInfoByDepartment,
  getAssetExpired,
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

  getAssetLoginInfoByDepartment: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await getAssetLoginInfoByDepartment(id);
      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },

  getAssetExpired: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getAssetExpired();
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
      // console.log("Creating asset login info with data:", data);

      const response = await createAssetLoginInfo(data);
      console.log(response);

      set({ loading: false, data: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  updateAsset: async (data) => {
    try {
      set({ loading: true, error: null });

      const response = await assetRecovery(data.id, data);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },
}));
