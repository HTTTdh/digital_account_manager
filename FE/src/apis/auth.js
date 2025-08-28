import  axiosConfig from "../axiosConfig";

export const login = async (data) => {
  return await axiosConfig({
    method: "post",
    url: "/auth/login",
    data,
  });
};

export const register = async (data) => {
  return await axiosConfig({
    method: "post",
    url: "/auth/register",
    data,
  });
};

export const logout = async () => {
  return await axiosConfig({
    method: "post",
    url: "/auth/logout",
  });
};
// xem tai khoan danh cho cap 1
export const getAllUser = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/tai-khoan/level1",
    params: { page: 1 },
  });
};
