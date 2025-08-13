import { axiosConfig } from "../axiosConfig";

export const login = async (data) => {
  return await axiosConfig({
    method: "post",
    url: "/user/login",
    data,
  });
};

export const register = async (data) => {
  return await axiosConfig({
    method: "post",
    url: "/user/register",
    data,
  });
};
