import { axiosConfig } from "../axiosConfig";

export const getTaiKhoanForLevel1 = async () => {
  return await axiosConfig({
    method: "get",
    url: "/api/account/tai-khoan/level1",
  });
};

export const findforLevel2 = async () => {
  return await axiosConfig({
    method: "get",
    url: "/api/account/tai-khoan/findforLevel2",
  });
};

export const getAllUser = async () => {
  return await axiosConfig({
    method: "get",
    url: "/api/",
  });
};

export const assetPrivate = async () => {
  return await axiosConfig({
    method: "get",
    url: "/api/admin/thong_tin_tai_san",
  });
};
