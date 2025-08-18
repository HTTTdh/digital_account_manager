import { axiosConfig } from "../axiosConfig";
export const getAllPersonalLogs = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/hanh_dong?userId=",
  });
}