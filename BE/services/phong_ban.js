const { PhongBan } = require("../model/phong_ban");
const { ChiTietHanhDong } = require("../model/chi_tiet_hanh_dong");
const getPhongBan = async (user) => {
    const results = await PhongBan.findAll();
    const value = {
        loai_hanh_dong: "Lấy danh sách tất cả phòng ban",
        HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return results;
}

const addPhongBan = async (data, user) => {
    const newPhongBan = await PhongBan.create(data);
    const value = {
        loai_hanh_dong: `Thêm phòng ban : ${data.ten}`,
        HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return newPhongBan;
}
const updatePhongBan = async (id, data, user) => {
    const phongBan = await PhongBan.findByPk(id);
    if (!phongBan) {
        return new Error("Phòng ban không tồn tại");
    }
    await phongBan.update(data);
    const value = {
        loai_hanh_dong: `Cập nhật phòng ban : ${phongBan.ten}  và id : ${id}`,
        HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return phongBan;
}
const deletePhongBan = async (id, user) => {
    const phongBan = await PhongBan.findByPk(id);
    if (!phongBan) {
        return new Error("Phòng ban không tồn tại");
    }
    await phongBan.destroy();
    const value = {
        loai_hanh_dong: `Xóa phòng ban có id : ${id} và tên : ${phongBan.ten}`,
        HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return { message: "Phòng ban đã được xóa thành công" };
}

module.exports = { getPhongBan, addPhongBan, updatePhongBan, deletePhongBan };