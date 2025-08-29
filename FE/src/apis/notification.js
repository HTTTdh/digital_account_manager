import axiosConfig from "../axiosConfig";

export const getNotificationByUser = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/thong_bao",
  });
};
