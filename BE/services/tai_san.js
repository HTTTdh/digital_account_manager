const { TaiSan } = require('../model/tai_san');
const { HanhDong } = require('../model/hanh_dong');
const { sequelize } = require("../config/database");
const { ChiTietHanhDong } = require('../model/chi_tiet_hanh_dong');

const getTaiSan = async (data, user) => {
    let filter = ``;

  if (data) {
    filter = filter + `WHERE ts.danh_muc_tai_san_id = '${data}'`;
  }
  const sql = `SELECT 
                    ts.*,
                    danhMucTaiSan.id AS danh_muc_tai_san_id,
                    danhMucTaiSan.ten AS danh_muc_tai_san_ten,
                    danhMucTaiSan.lien_he AS danh_muc_tai_san_lien_he,
                    danhMucTaiSan.link AS danh_muc_tai_san_link

                FROM 
                    tai_san AS ts
                JOIN 
                    danh_muc_tai_san AS danhMucTaiSan ON danhMucTaiSan.id = ts.danh_muc_tai_san_id
                ${filter};`;

    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    console.log("Tai San Results:", results);
    const value = {
            loai_hanh_dong: "Lấy tài sản theo danh mục",
           HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return results;
}

const addTaiSan = async (data, user) => {
    const newTaiSan = await TaiSan.create(data);
    const value = {
            loai_hanh_dong: "Thêm tài sản mới",
           HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return newTaiSan;
}
const updateTaiSan = async (id, data, user) => {
    const taiSan = await TaiSan.findByPk(id);
    if (!taiSan) {
        return new Error("Tài sản không tồn tại");
    }
    await taiSan.update(data);
    const value = {
            loai_hanh_dong: "Cập nhật tài sản",
           HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return taiSan;
}
const deleteTaiSan = async (id, user) => {
    const taiSan = await TaiSan.findByPk(id);
    if (!taiSan) {
        return new Error("Tài sản không tồn tại");
    }
    await taiSan.destroy();
    const value = {
            loai_hanh_dong: "Xóa tài sản",
            HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return { message: "Tài sản đã được xóa thành công" };
}

module.exports = { getTaiSan, addTaiSan, updateTaiSan, deleteTaiSan };
