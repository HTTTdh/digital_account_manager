import axiosConfig from "../axiosConfig";
export const getActivityHistory = async (filters = {}, page) => {
    return await axiosConfig({
    method: "get",
    url: "/admin/hanh_dong",
    params: { filters, page: page ? page : 1},
  })
}