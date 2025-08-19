const { sequelize } = require("../config/database");
const { ChiTietHanhDong } = require("../model/chi_tiet_hanh_dong");
const findforLevel1 = async (user) => {
    const sql = `SELECT tk.*, pb.ten
                FROM tai_khoan tk
                JOIN phong_ban pb ON tk.phong_ban_id = pb.id
                WHERE tk.cap > 1;`;

    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    const value = {
            loai_hanh_dong: "Lấy danh sách người dùng cho cấp 1",
            HanhDongId: user.hanh_dong
  }
    await ChiTietHanhDong.create(value);
    
    return results;
};



const findforLevel2 = async (user) => {
    console.log("User for Level 2:", user.hanh_dong);
    const sql = `SELECT tk.*, pb.ten
                FROM tai_khoan tk
                JOIN phong_ban pb ON tk.phong_ban_id = pb.id
                WHERE tk.cap > ${user.cap}
                AND pb.id = ${user.PhongBanId};`;
    console.log("SQL Query:", sql);
    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    const value = {
            loai_hanh_dong: "Lấy danh sách người dùng cho cấp 2",
            HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    return results;
};




module.exports = {
  findforLevel1,
  findforLevel2,
};
