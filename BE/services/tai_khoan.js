const { sequelize } = require("../config/database");
const findforLevel1 = async () => {
    const sql = `SELECT tk.*, pb.ten
                FROM tai_khoan tk
                JOIN phong_ban pb ON tk.phong_ban_id = pb.id
                WHERE tk.cap > 1;`;
    
    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    return results;
};
const findforLevel2 = async () => { 
    const sql = `SELECT tk.*, pb.ten
                FROM tai_khoan tk
                JOIN phong_ban pb ON tk.phong_ban_id = pb.id
                WHERE tk.cap > 2
                AND pb.id = 4`;
    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    return results;
                };
module.exports = {
    findforLevel1, findforLevel2
};

// có 2 TH:
// 1. cấp 1 xem cấp dưới thì xem tất cả 
// 2. cấp 2 xem cấp 3 thì chỉ hiện chung phòng ban 