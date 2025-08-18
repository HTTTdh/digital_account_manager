import { axiosConfig } from "../axiosConfig";

export const getAllAsset = async () => {
  return axiosConfig({
    method: "get",
    url: "/admin/tai_san",
  });
};

export const getAssetByIdCategory = async (id) => {
  return axiosConfig({
    method: "get",
    url: `/admin/tai_san?idDanhMucTaiSan=3`,
  });
};

export const createAsset = async (data) => {
  return axiosConfig({
    method: "post",
    url: "/admin/tai_san",
    data,
  });
};
