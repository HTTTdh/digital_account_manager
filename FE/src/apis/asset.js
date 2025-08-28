import axiosConfig from "../axiosConfig";

export const getAllAsset = async () => {
  return axiosConfig({
    method: "get",
    url: "/admin/tai_san",
  });
};

export const getAssetByIdCategory = async (id) => {
  return axiosConfig({
    method: "get",
    url: `/admin/tai_san?idDanhMucTaiSan=${id}`,
  });
};

export const createAsset = async (data) => {
  return axiosConfig({
    method: "post",
    url: "/admin/tai_san",
    data,
  });
};

export const updateAsset = async (id, data) => {
  return axiosConfig({
    method: "patch",
    url: `/admin/tai_san/${id}`,
    data,
  });
};

export const deleteAsset = async (id) => {
  return axiosConfig({
    method: "delete",
    url: `/admin/tai_san/${id}`,
  });
};
