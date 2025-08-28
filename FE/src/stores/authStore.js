import { create } from "zustand";
import { getAllUser } from "../apis/auth";
import { assetPrivate } from "../apis/user";

export const AuthStore = create((set) => ({
  data: [],
  // xem tai san ca nhan
  // assetPrivate: async () => {
  //   try {
  //     const response = await assetPrivate();
  //     set({data: response });
  //     return response;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // },

  // getAllUser: async () => {
  //   try {
  //     const response = await getAllUser();
  //     set({  data: response });
  //     return response;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // },
}));
