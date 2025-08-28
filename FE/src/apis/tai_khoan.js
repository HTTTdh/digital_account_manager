import axiosConfig from "../axiosConfig";

export const getPhongBan = async () => {
    return await axiosConfig({
        method: "get",
        url: "/admin/phong_ban",
    });
};

export const findforLevel1 = async () => {
    return await axiosConfig({
        method: "get",
        url: "/admin/tai-khoan/level1",
        params: { page: 1 },
    });
};


export const themTaiKhoan = async (data) => {
    return axiosConfig({
        method: "post",
        url: "/auth/register",
        data,
    });
};


export const suaTaiKhoan = async (id, data) => {
    return axiosConfig({
        method: "patch",
        url: `/auth/update/${id}`,
        data
    });
};
