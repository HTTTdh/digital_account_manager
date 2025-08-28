import {
  getAllAssetLoginInfo,
  createAssetLoginInfo,
  assetRecovery,
  getAssetLoginInfoPrivate,
  getAssetExpired,
  updateAssetLoginInfo,
} from "../apis/assetLoginInfo";
import { create } from "zustand";

export const AssetLoginInfoStore = create((set) => ({
  data: [],

  getAllAssetLoginInfo: async () => {
    try {
      const response = await getAllAssetLoginInfo();
      set({ data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getAssetLoginInfoPrivate: async () => {
    try {
      const response = await getAssetLoginInfoPrivate();
      set({ data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  // getAssetLoginInfoByDepartment: async (id) => {
  //   try {
  //     set({ loading: true, error: null });
  //     const response = await getAssetLoginInfoByDepartment(id);
  //     set({ loading: false, data: response });
  //     return response;
  //   } catch (error) {
  //     set({ loading: false, error: error.message });
  //     console.log(error);
  //   }
  // },

  getAssetExpired: async () => {
    try {
      const response = await getAssetExpired();
      set({ data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  createAssetLoginInfo: async (data) => {
    try {
      const response = await createAssetLoginInfo(data);
      set((state) => ({
        data: [...state.data, response],
      }));
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updateAssetLoginInfo: async (id, data) => {
    try {
      const response = await updateAssetLoginInfo(id, data);
      set((state) => ({
        data: state.data.map((item) =>
        (item.id === id ? response : item)
        )
      }));
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  // updateAsset: async (data) => {
  //   try {
  //     const response = await assetRecovery(data.id, data);
  //     set({ data: response });
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
}));
