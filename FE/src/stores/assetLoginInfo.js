import {
  getAllAssetLoginInfo,
  createAssetLoginInfo,
  getAssetLoginInfoPrivate,
  getAssetExpired,
  updateAssetLoginInfo,
  getAssetLoginInfoByDepartment
} from "../apis/assetLoginInfo";
import { create } from "zustand";

export const AssetLoginInfoStore = create((set) => ({
  data: [],

  getAllAssetLoginInfo: async (page) => {
    try {
      const response = await getAllAssetLoginInfo(page);
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

  getAssetLoginInfoByDepartment: async (id) => {
    try {
      const response = await getAssetLoginInfoByDepartment(id);
      set({ data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

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
      data: [...state.data, response.data.data], // state.data là mảng
    }));
    return response;
  } catch (error) {
    console.log(error);
  }
},
  updateAssetLoginInfo: async (id, data) => {
    try {
      const response = await updateAssetLoginInfo(id, data);
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
