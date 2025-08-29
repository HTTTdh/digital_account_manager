const { ThongBao } = require("../model/thong_bao");
const { ChiTietHanhDong } = require("../model/chi_tiet_hanh_dong");


// Lấy tất cả thông báo
const getThongBao = async (user) => {
    const results = await ThongBao.findAll({
        where : {
            tai_khoan_id : user.id
        },
        order: [["thoi_gian", "DESC"]],
    });

    const value = {
        loai_hanh_dong: "Lấy danh sách tất cả thông báo",
        HanhDongId: user.hanh_dong
    };
    await ChiTietHanhDong.create(value);

    return results;
};



// Thêm mới thông báo
const addThongBao = async (data) => {
    const newThongBao = await ThongBao.create(data);

    return newThongBao;
};



module.exports = {
    getThongBao,
    addThongBao
};