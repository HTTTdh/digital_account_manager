const { TaiSan } = require("../model/tai_san");
const { HanhDong } = require("../model/hanh_dong");
const { sequelize } = require("../config/database");
const { ChiTietHanhDong } = require('../model/chi_tiet_hanh_dong');
const { DanhMucTaiSan } = require('../model/danh_muc_tai_san');

const getTaiSan = async (data, user) => {
    let filter = ``;
    let DanhMucTaiSan1 = null;
    if (data) {
        DanhMucTaiSan1 =await DanhMucTaiSan.findByPk(data);
        filter = filter + `WHERE ts.danh_muc_tai_san_id = ${data}`;
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
  let moTaHanhDong = "Lấy danh sách tài sản";
  if (data) {
    moTaHanhDong += ` theo danh mục: ${DanhMucTaiSan1.ten}`;
  }

  const value = {
    loai_hanh_dong: moTaHanhDong,
    HanhDongId: user.hanh_dong
  };

  await ChiTietHanhDong.create(value);
  return results;
};

const addTaiSan = async (data, user) => {
    const newTaiSan = await TaiSan.create(data);
    const value = {
        loai_hanh_dong: `Thêm tài sản mới có tên là ${data.ten_tai_san} và nhà cung cấp là ${data.ten_nha_cung_cap}`,
        HanhDongId: user.hanh_dong
    }
    console.log("12345")
    console.log(value);
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
            loai_hanh_dong: `Cập nhật tài sản có tên là ${data.ten_tai_san} và nhà cung cấp là ${data.ten_nha_cung_cap}`,
           HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return taiSan;
}
const deleteTaiSan = async (id, user) => {
    const taiSan = await TaiSan.findByPk(id);
    const ten_tai_san = taiSan.ten_tai_san;
    if (!taiSan) {
        return new Error("Tài sản không tồn tại");
    }
    await taiSan.destroy();
    const value = {
            loai_hanh_dong: `Xóa tài sản ${ten_tai_san}`,
            HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return { message: "Tài sản đã được xóa thành công" };
}

module.exports = { getTaiSan, addTaiSan, updateTaiSan, deleteTaiSan };
