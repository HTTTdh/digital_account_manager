import { axiosConfig } from "../axiosConfig";

export const getHanhDongByUser = async (id) => {
  return await axiosConfig({
    method: "get",
    url: `/api/admin/hanh_dong/user/${id}`,
  });
};

export const getHanhDongByPhongBan = async (id) => {
  return await axiosConfig({
    method: "get",
    url: `/api/admin/hanh_dong/phong_ban/${id}`,
  });
};

export const getHanhDongByDate = async (date) => {
  return await axiosConfig({
    method: "get",
    url: `/api/admin/hanh_dong/date/${date}`,
  });
};
