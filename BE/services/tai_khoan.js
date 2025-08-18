const { TaiKhoan } = require("../model/tai_khoan");
const { sequelize } = require("../config/database");



const findforLevel1 = async () => {
    const sql = `SELECT tk.*, pb.ten
                FROM tai_khoan tk
                JOIN phong_ban pb ON tk.phong_ban_id = pb.id
                WHERE tk.cap > 1;`;

    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    return results;
};



const findforLevel2 = async (user) => {
    
    const sql = `SELECT tk.*, pb.ten
                FROM tai_khoan tk
                JOIN phong_ban pb ON tk.phong_ban_id = pb.id
                WHERE tk.cap > ${user.cap}
                AND pb.id = ${user.id}`;
    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    return results;
};




module.exports = {
    findforLevel1, findforLevel2,
};
