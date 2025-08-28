import axiosConfig from "../axiosConfig";

export const getAllThuongHieu = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/danh_muc_tai_san",
  });
}

export const createThuongHieu = async (data) => {
  return axiosConfig({
    method: "post",
    url: "/admin/danh_muc_tai_san",
    data,
  });
}

export const updateThuongHieu = async (id, data) => {
  return axiosConfig({
    method: "patch",
    url: `/admin/danh_muc_tai_san/${id}`,
    data,
  });
}

export const deleteThuongHieu = async (id) => {
  return axiosConfig({
    method: "delete",
    url: `/admin/danh_muc_tai_san/${id}`,
  });
}
