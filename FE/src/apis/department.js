import axiosConfig from "../axiosConfig";

export const getAllDepartment = async () => {
  return await axiosConfig({
    method: "get",
    url: "/admin/phong_ban",
  });
};

// export const getUserByDepartment = async () => {
//   return await axiosConfig({
//     method: "get",
//     url: "/admin/tai-khoan/level2",
//   });
// };

// export const getDepartmentById = async (id) => {
//   return await axiosConfig({
//     method: "get",
//     url: `/admin/phong_ban/${id}`,
//   });
// };

export const createDepartment = async (data) => {
  return await axiosConfig({
    method: "post",
    url: "/admin/phong_ban",
    data,
  });
};

export const updateDepartment = async (id, data) => {
  return await axiosConfig({
    method: "patch",
    url: `/admin/phong_ban/${id}`,
    data,
  });
};

export const deleteDepartment = async (id) => {
  return await axiosConfig({
    method: "delete",
    url: `/admin/phong_ban/${id}`,
  });
};
