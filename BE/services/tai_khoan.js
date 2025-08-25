const { sequelize } = require("../config/database");
const { ChiTietHanhDong } = require("../model/chi_tiet_hanh_dong");

const findforLevel1 = async (user, page) => {
  const sql = `SELECT tk.*, pb.ten,
                COUNT(*) OVER() AS total_count
                FROM tai_khoan tk
                JOIN phong_ban pb ON tk.phong_ban_id = pb.id
                WHERE tk.cap > 1
                ORDER BY tk.ho_ten
                ;`;

  const results = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  const value = {
    loai_hanh_dong: "Lấy danh sách nhân viên bao gồm cả nhân viên quản lý phòng ban ",
    HanhDongId: user.hanh_dong,
  };
  await ChiTietHanhDong.create(value);

  return results;
};

const findforLevel2 = async (user, page) => {
  const sql = `WITH RECURSIVE ThongTinDangNhap AS (
                    SELECT 
                        ttdn.id,
                        ttdn.trang_thai,
                        ttdn.ngay_thu_hoi,
                        ttdn.ngay_cap,
                        ts.ten_tai_san,
                        ts.ten_nha_cung_cap,
                        tk.id AS tai_khoan_id
                    FROM thong_tin_dang_nhap_tai_san ttdn
                    JOIN tai_san ts ON ts.id = ttdn.tai_san_id
                    JOIN tai_khoan tk ON tk.id = ttdn.nguoi_nhan_id)
                SELECT 	
                    tk.*,
                    pb.ten,
                    JSONB_AGG(
                        DISTINCT JSONB_BUILD_OBJECT(
                                'thong_tin_dang_nhap_id', ttdn.id,
                                'trang_thai', ttdn.trang_thai,
                                'ngay_thu_hoi', ttdn.ngay_thu_hoi,
                                'ngay_cap', ttdn.ngay_cap,
                                'ten_tai_san', ttdn.ten_tai_san,
                                'ten_nha_cung_cap', ttdn.ten_nha_cung_cap
                            )
                        ) AS thong_tin_dang_nhap
                FROM tai_khoan tk
                JOIN phong_ban pb ON tk.phong_ban_id = pb.id
                LEFT JOIN ThongTinDangNhap ttdn ON ttdn.tai_khoan_id = tk.id
                WHERE tk.cap > ${user.cap} AND pb.id = ${user.PhongBanId}
                GROUP BY  tk.id, pb.ten
                ORDER BY tk.ho_ten
                LIMIT 20 OFFSET (${page} - 1) * 20
                ;`;

  const results = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  const value = {
    loai_hanh_dong: `Lấy danh sách nhân viên theo phòng ban ${user.PhongBanId}`,
    HanhDongId: user.hanh_dong,
  };
  await ChiTietHanhDong.create(value);
  return results;
};

module.exports = {
  findforLevel1,
  findforLevel2,
};
