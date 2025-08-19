import { axiosConfig } from "../axiosConfig";

export const getAllAssetLoginInfo = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/v1/thong_tin_tai_san",
  });
};

export const getAssetLoginInfoPrivate = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/thong_tin_tai_san",
  });
};

export const getAssetLoginInfoByDepartment = async (id) => {
  return await axiosConfig({
    method: "get",
    url: `/admin/v1/thong_tin_tai_san?id_phong_ban/${id}`,
  });
};

export const getAssetExpired = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/thong_bao_het_han",
  });
};

export const createAssetLoginInfo = async (data) => {
  return await axiosConfig({
    method: "post",
    url: "/admin/thong_tin_tai_san",
    data,
  });
};

export const assetRecovery = async (id, data) => {
  return await axiosConfig({
    method: "patch",
    url: `/admin/thong_tin_tai_san/${id}`,
    data,
  });
};
