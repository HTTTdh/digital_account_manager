import { axiosConfig } from "../axiosConfig";
export const getActivityHistory = async (filters = {}) => {
    return await axiosConfig({
    method: "get",
    url: "/admin/hanh_dong",
      params: { filters, page: 1 },
  })
}