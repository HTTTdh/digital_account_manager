import axiosConfig from "../axiosConfig";

// truyen filters dang {idDanhMucTaiSan:value}
export const getAllAsset = async (filters = {}) => {
  return axiosConfig({
    method: "get",
    url: "/admin/tai_san",
    params: filters, 
  });
};

//  // xem lai 
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
