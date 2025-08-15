const { DanhMucTaiSan } = require("../model/danh_muc_tai_san");

const { TaiSan } = require("../model/tai_san");

const { sequelize } = require("../config/database");

//chưa sửa
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

module.exports = {
    getDanhMucTaiSan
};
