import { create } from "zustand";
import {
  createAssetRequest,
  getAllAssetRequest,
  updateStatusAssetRequest,
} from "../apis/assetRequest";

export const AssetRequestStore = create((set) => ({
  data: [],

  getAllAssetRequest: async () => {
    try {
      const response = await getAllAssetRequest();
      set({ data: response });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  createAssetRequest: async (data) => {
    try {
      const response = await createAssetRequest(data);
      set((state) => ({
        data: [...state.data, response],
      }));
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  updateStatusAssetRequest: async (id, data) => {
    try {
      const response = await updateStatusAssetRequest(id, data);
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  },
}));
