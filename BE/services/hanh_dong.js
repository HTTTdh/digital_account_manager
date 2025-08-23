const { ChiTietHanhDong } = require('../model/chi_tiet_hanh_dong');
const {sequelize} = require('../config/database');
const getHanhDong = async (data, user) => {
    let conditions = [];

    if (data) {
        if (data.userId) {
            conditions.push(`tk.id = '${data.userId}'`);
        }
        if (data.phongBanId) {
            conditions.push(`pb.id = '${data.phongBanId}'`);
        }

        // Lọc theo khoảng ngày
        if (data.startDate && data.endDate) {
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            endDate.setDate(endDate.getDate() + 1); // để include cả ngày cuối
            conditions.push(`hd.thoi_diem_dang_nhap >= '${startDate.toISOString()}' AND hd.thoi_diem_dang_nhap < '${endDate.toISOString()}'`);
        }
    }

    let where = '';
    if (conditions.length > 0) {
        where = 'WHERE ' + conditions.join(' AND ');
    }

    const sql = `
        SELECT 
            hd.id AS hanh_dong_id,
            hd.thoi_diem_dang_nhap,
            tk.ho_ten AS tai_khoan_ho_ten,
            tk.username AS tai_khoan_username,
            ct.loai_hanh_dong,
            ct.thoi_gian_thuc_hien
        FROM hanh_dong AS hd
        JOIN tai_khoan AS tk ON hd.tai_khoan_id = tk.id
        JOIN phong_ban AS pb ON tk.phong_ban_id = pb.id
        JOIN chi_tiet_hanh_dong AS ct ON hd.id = ct.hanh_dong_id
        ${where}
        ORDER BY ct.thoi_gian_thuc_hien DESC;
    `;

    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });

    // Ghi log hành động của user
    const value = {
        loai_hanh_dong: "Xem tất cả hành động",
        HanhDongId: user.hanh_dong
    };
    await ChiTietHanhDong.create(value);

    return results;
};


const getHanhDongById = async (id, user) => {

    const sql = `SELECT 
                    hd.id AS hanh_dong_id,
                    hd.thoi_diem_dang_nhap,
                    tk.ho_ten AS tai_khoan_ho_ten,
                    tk.username AS tai_khoan_username,
                    pb.ten AS ten,
                    ct.loai_hanh_dong,
                    ct.thoi_gian_thuc_hien
                FROM
                    hanh_dong AS hd
                JOIN
                    tai_khoan AS tk ON hd.tai_khoan_id = tk.id
                JOIN
                    phong_ban AS pb ON tk.phong_ban_id = pb.id
                JOIN
                    chi_tiet_hanh_dong AS ct ON hd.id = ct.hanh_dong_id
                WHERE tk.id = ${id}
                ORDER BY ct.thoi_gian_thuc_hien DESC;`;
    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });

    const value = {
            loai_hanh_dong: `Xem hành động của nhân viên : ${results[0].tai_khoan_ho_ten} thuộc phòng ban : ${results[0].ten}`,
            HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);

    return results;
};
module.exports = {
    getHanhDong,
    getHanhDongById
};