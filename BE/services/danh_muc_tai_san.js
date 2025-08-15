const { DanhMucTaiSan } = require("../model/danh_muc_tai_san");
const { ChiTietHanhDong } = require("../model/chi_tiet_hanh_dong");
const { TaiSan } = require("../model/tai_san");

const { sequelize } = require("../config/database");


const getDanhMucTaiSan = async (data) => {

    let filter = ``;

    if(data){
        if(data.danhmuc){
            filter = filter + `WHERE ncc.ten = '${data.danhmuc}'`;
        }
        if(data.TaiSan){
            filter = filter + `AND sp.ten_tai_san = '${data.TaiSan}'`;
        }
    }
    const sql = `SELECT 
                    ncc.id AS nha_cung_cap_id,
                    ncc.ten AS ten_nha_cung_cap,
                    ncc.lien_he,
                    ncc.link,
                    sp.id AS tai_san_id,
                    sp.ten_tai_san,
                    sp.tong_so_luong,
                    sp.so_luong_con
                FROM 
                    nha_cung_cap AS ncc
                JOIN 
                    tai_san AS sp ON ncc.id = sp.nha_cung_cap_id
                ${filter};`;

    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    return results;
};

const addDanhMucTaiSan = async (data, hanh_dong) => {
    const newDanhMucTaiSan = await DanhMucTaiSan.create(data);
    // const value = {
    //         loai_hanh_dong : "Thêm danh mục tài sản", 
    //         HanhDongId : hanh_dong
    //     }
    //     await ChiTietHanhDong.create(value);
    return newDanhMucTaiSan;
}
const updateDanhMucTaiSan = async (id, data) => {
    const danhMucTaiSan = await DanhMucTaiSan.findByPk(id);
    if (!danhMucTaiSan) {
        return new Error("Danh mục tài sản không tồn tại");
    }
    await danhMucTaiSan.update(data);
    return danhMucTaiSan;
}
const deleteDanhMucTaiSan = async (id) => {
    const danhMucTaiSan = await DanhMucTaiSan.findByPk(id);
    if (!danhMucTaiSan) {
        return new Error("Danh mục tài sản không tồn tại");
    }
    await danhMucTaiSan.destroy();
    return { message: "Danh mục tài sản đã được xóa thành công" };
}
module.exports = {
    getDanhMucTaiSan, addDanhMucTaiSan, updateDanhMucTaiSan, deleteDanhMucTaiSan
};
