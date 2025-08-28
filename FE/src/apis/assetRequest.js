import axiosConfig from "../axiosConfig";

export const getAllAssetRequest = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/yeu_cau",
  });
};

export const createAssetRequest = async (data) => {
  return await axiosConfig({
    method: "post",
    url: "/admin/yeu_cau",
  });
};

export const updateStatusAssetRequest = async (id, data) => {
  return await axiosConfig({
    method: "patch",
    url: `/admin/yeu_cau/${id}`,
    data,
  });
};
