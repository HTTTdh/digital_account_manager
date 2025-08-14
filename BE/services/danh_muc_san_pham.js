const { DanhMucThuongHieu } = require("../model/danh_muc_tai_san");

const { ThuongHieu } = require("../model/thuong_hieu");

const { sequelize } = require("../config/database");


const getDanhMucThuongHieu = async (data) => {

    let filter = ``;

    if(data){
        if(data.danhmuc){
            filter = filter + `WHERE ncc.ten = '${data.danhmuc}'`;
        }
        if(data.ThuongHieu){
            filter = filter + `AND sp.ten_thuong_hieu = '${data.ThuongHieu}'`;
        }
    }
    const sql = `SELECT 
                    ncc.id AS nha_cung_cap_id,
                    ncc.ten AS ten_nha_cung_cap,
                    ncc.lien_he,
                    ncc.link,
                    sp.id AS thuong_hieu_id,
                    sp.ten_thuong_hieu,
                    sp.tong_so_luong,
                    sp.so_luong_con
                FROM 
                    nha_cung_cap AS ncc
                JOIN 
                    thuong_hieu AS sp ON ncc.id = sp.nha_cung_cap_id
                ${filter};`;

    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    return results;
};

module.exports = {
    getDanhMucThuongHieu
};
