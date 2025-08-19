import { axiosConfig } from "../axiosConfig";
export const getAllPersonalLogs = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/user/hanh_dong",
  });
}