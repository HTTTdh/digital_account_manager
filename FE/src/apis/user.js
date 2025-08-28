import axiosConfig from "../axiosConfig";

export const getTaiKhoanForLevel1 = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/tai-khoan/level1",
    params: { page: 1 },
  });
};

export const findforLevel2 = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/tai-khoan/level2",
  });
};

export const assetPrivate = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/thong_tin_tai_san",
    params: { page: 1},
  });
};
