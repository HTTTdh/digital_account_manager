import { axiosConfig } from "../axiosConfig";

export const getNotificationByUser = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/thong_bao?page=1",
  });
};

export const createNotification = async (data) => {
  return await axiosConfig({
    method: "post",
    url: "/admin/thong_bao",
    data,
  });
};
