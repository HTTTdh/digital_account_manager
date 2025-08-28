import axiosConfig from "../axiosConfig";
export const getAllPersonalLogs = async (page) => {
  return await axiosConfig({
    method: "get",
    url: "/admin/user/hanh_dong",
    params: { page: page ? page : 1 },
  });
}