import { getAllDepartment, createDepartment as createPB, updateDepartment as update , deleteDepartment as del} from "../apis/department";
import { create } from "zustand";

export const DepartmentStore = create((set) => ({
  data: [],

  // getUserByDepartment: async () => {
  //   try {
  //     const response = await getUserByDepartment();
  //     set({ data: response });

  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  getAllDepartment: async () => {
    try {
      const response = await getAllDepartment();
      set({ data: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  // getDepartmentById: async (id) => {
  //   try {
  //     const response = await getDepartmentID(id);
  //     set({  data: response });
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  createDepartment: async (data) => {
      try {
        const response = await createPB(data);
        set((state) => ({
          data: [...state.data, response.data],
        }));
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  
    updateDepartment: async (id, data) => {
      try {
        const response = await update(id, data);
        set((state) => ({
          data: state.data.map((item) =>
          (item.id === id ? response.data : item)
          )
        }));
  
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  
    deleteDepartment: async (id) => {
      try {
        const response = await del(id);
        set((state) => ({
        data: state.data.filter((item) => item.id !== id),
      }));
        return response;
      } catch (error) {
        console.log(error);
      }
    },
}));