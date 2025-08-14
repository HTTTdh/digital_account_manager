const { DanhMucSanPham } = require("../model/danh_muc_san_pham");

const { SanPham } = require("../model/san_pham");

const { sequelize } = require("../config/database");


const getDanhMucSanPham = async (data) => {

    let filter = ``;

    if(data){
        if(data.danhmuc){
            filter = filter + `WHERE ncc.ten = '${data.danhmuc}'`;
        }
        if(data.sanpham){
            filter = filter + `AND sp.ten_san_pham = '${data.sanpham}'`;
        }
    }
    const sql = `SELECT 
                    ncc.id AS nha_cung_cap_id,
                    ncc.ten AS ten_nha_cung_cap,
                    ncc.lien_he,
                    ncc.link,
                    sp.id AS san_pham_id,
                    sp.ten_san_pham,
                    sp.tong_so_luong,
                    sp.so_luong_con
                FROM 
                    nha_cung_cap AS ncc
                JOIN 
                    san_pham AS sp ON ncc.id = sp.nha_cung_cap_id
                ${filter};`;

    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    return results;
};

module.exports = {
    getDanhMucSanPham
};
