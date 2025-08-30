import axiosConfig from "../axiosConfig";
// lay tat ca thong tin dang nhap theo bo loc
export const getAllAssetLoginInfo = async (page, filters) => {
  return await axiosConfig({
    method: "get",
    url: "/admin/v1/thong_tin_tai_san",
    params: {filters, page : page ? page : 1},
  });
};
// xem thong tin tai san ca nhan
export const getAssetLoginInfoPrivate = async (page) => {
  return await axiosConfig({
    method: "get",
    url: "/admin/thong_tin_tai_san",
    params: { page: page ? page : 1 },
  });
};
// coi xoa
// export const getAssetLoginInfoByDepartment = async (id, page) => {
//   return await axiosConfig({
//     method: "get",
//     url: `/admin/v1/thong_tin_tai_san?id_phong_ban=${id}&page=1`,

//   });
// };
// // xem thong bao het han
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
// sua thong tin tai san 
// export const assetRecovery = async (id, data) => {
//   return await axiosConfig({
//     method: "patch",
//     url: `/admin/thong_tin_tai_san/${id}`,
//     data,
//   });
// };
// sua thong tin tai san 
export const updateAssetLoginInfo = async (id, data) => {
  return await axiosConfig({
    method: "patch",
    url: `/admin/thong_tin_tai_san/${id}`,
    data,
  });
};
