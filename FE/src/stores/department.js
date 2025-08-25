import { getUserByDepartment } from "../apis/department";
import { create } from "zustand";

export const DepartmentStore = create((set) => ({
  data: [],
  loading: false,
  error: null,

  getUserByDepartment: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getUserByDepartment();
      set({ loading: false, data: response.data });
      //   console.log(r);

      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
      console.log(error);
    }
  },
}));
