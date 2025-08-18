const {TaiSan} = require('../model/tai_san');
const { sequelize } = require("../config/database");

const getTaiSan = async (data) => {
    let filter = ``;

    if(data){
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
    return results;
}

const addTaiSan = async (data) => {
    const newTaiSan = await TaiSan.create(data);
    return newTaiSan;
}
const updateTaiSan = async (id, data) => {
    const taiSan = await TaiSan.findByPk(id);
    if (!taiSan) {
        return new Error("Tài sản không tồn tại");
    }
    await taiSan.update(data);
    return taiSan;
}
const deleteTaiSan = async (id) => {
    const taiSan = await TaiSan.findByPk(id);
    if (!taiSan) {
        return new Error("Tài sản không tồn tại");
    }
    await taiSan.destroy();
    return { message: "Tài sản đã được xóa thành công" };
}

module.exports = { getTaiSan, addTaiSan, updateTaiSan, deleteTaiSan };