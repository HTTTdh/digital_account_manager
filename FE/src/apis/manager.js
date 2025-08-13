import { axiosConfig } from "../axiosConfig";

export const requestAsset = async (data) => {
  return await axiosConfig({
    method: "post",
    url: "/api/admin/yeu_cau",
    data,
  });
};
