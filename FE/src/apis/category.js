import { axiosConfig } from "../axiosConfig";

export const getAllCategory = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/danh_muc_tai_san",
  });
};

export const createCategory = async (data) => {
  return axiosConfig({
    method: "post",
    url: "/admin/danh_muc_tai_san",
    data,
  });
};

