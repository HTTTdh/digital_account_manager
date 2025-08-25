import { axiosConfig } from "../axiosConfig";

export const getAllAssetLoginInfo = async (page) => {
  return await axiosConfig({
    method: "get",
    url: "/admin/v1/thong_tin_tai_san",
    params: {page : page ? page : 1},
  });
};

export const getAssetLoginInfoPrivate = async (page) => {
  return await axiosConfig({
    method: "get",
    url: "/admin/thong_tin_tai_san",
    params: { page: page ? page : 1 },
  });
};

export const getAssetLoginInfoByDepartment = async (id, page) => {
  return await axiosConfig({
    method: "get",
    url: `/admin/v1/thong_tin_tai_san?id_phong_ban=${id}`,
    params: { page: page ? page : 1 },

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
