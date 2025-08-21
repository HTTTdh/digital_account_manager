const {
  ThongTinDangNhapTaiSan,
} = require("../model/thong_tin_dang_nhap_tai_san");
const { HanhDong } = require("../model/hanh_dong");
const { sequelize } = require("../config/database");
const { ChiTietHanhDong } = require("../model/chi_tiet_hanh_dong");
const { PhongBan } = require("../model/phong_ban");
const { TaiKhoan } = require("../model/tai_khoan");
const postThongTinDangNhapTaiSan = async (data, user) => {
  try {
    const thong_tin_dang_nhap_tai_san = await ThongTinDangNhapTaiSan.create(
      data
    );

    const value = {
      loai_hanh_dong: `Thêm thông tin đăng nhập tài sản cho nhân viên ${data.NguoiNhan}`,
      HanhDongId: user.hanh_dong,
    };
    await ChiTietHanhDong.create(value);
    return thong_tin_dang_nhap_tai_san;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const getThongTinDangNhapTaiSan = async (value, user) => {
  try {
    let conditions = [];
    let actionDetails = [];
    let moTaHanhDong = "Xem thông tin đăng nhập tài sản";
    if (value) {
      if (value.nhan_vien) {
        const nhan_vien = TaiKhoan.findByPk(value.nhan_vien);
        actionDetails.push(`nhân viên ID: ${nhan_vien.ho_ten}`);
        conditions.push(`tk1.id = ${value.nhan_vien}`);
      }

      if (value.id_phong_ban) {
        const phong_ban = PhongBan.findByPk(value.id_phong_ban);
        conditions.push(`pb.id = '${value.id_phong_ban}'`);
        actionDetails.push(`phòng ban ID: ${phong_ban.ten}`);
      }
      if (value.ten_danh_muc_tai_san) {
        conditions.push(`dmts.ten = '${value.ten_danh_muc_tai_san}'`);
         actionDetails.push(`danh mục tài sản: ${value.ten_danh_muc_tai_san}`);
      }
    }

    let where = "";
    if (conditions.length > 0) {
      where = " WHERE " + conditions.join(" AND ");

    }
    if (actionDetails.length > 0) {
      moTaHanhDong += " với bộ lọc " + actionDetails.join(", ");
    }
    const sql = `SELECT
                        ttdn.id,
                        ttdn.thong_tin,
                        ttdn.ngay_cap,
                        ts.ten_tai_san,
                        ts.ten_nha_cung_cap,
                        dmts.ten AS ten_danh_muc_tai_san,
                        tk1.ho_ten AS ho_ten_nguoi_nhan,
                        pb.ten AS ten_phong_ban
                    FROM 
                        thong_tin_dang_nhap_tai_san ttdn
                    JOIN
                        tai_san ts ON ts.id = ttdn.tai_san_id
                    JOIN
                        yeu_cau yc ON ts.id = yc.tai_san_id
                    JOIN
                        tai_khoan tk1 ON tk1.id = yc.nguoi_nhan_id
                    JOIN
                        tai_khoan tk2 ON tk2.id = yc.nguoi_yeu_cau_id
                    JOIN
                        danh_muc_tai_san dmts ON dmts.id = ts.danh_muc_tai_san_id
                    JOIN
                        phong_ban pb ON tk1.phong_ban_id = pb.id
                    ${where}`;
    // console.log("SQL Query:", sql);
    const data = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    const value1 = {
      loai_hanh_dong: moTaHanhDong,
      HanhDongId: user.hanh_dong,
    };
    await ChiTietHanhDong.create(value1);
    return data;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const getThongTinTaiSan = async (id, user) => {
  try {
    const sql = `SELECT
                        ttdn.id,
                        ttdn.thong_tin,
                        ttdn.ngay_cap,
                        ttdn.trang_thai,
                        ts.ten_tai_san,
                        ts.ten_nha_cung_cap,
                        dmts.ten AS ten_danh_muc_tai_san,
                        tk1.ho_ten AS ho_ten_nguoi_nhan,
                        tk2.ho_ten AS ho_ten_nguoi_yeu_cau,
                        pb.ten AS ten_phong_ban
                    FROM 
                        thong_tin_dang_nhap_tai_san ttdn
                    JOIN
                        tai_san ts ON ts.id = ttdn.tai_san_id
                    JOIN
                        yeu_cau yc ON ts.id = yc.tai_san_id
                    JOIN
                        tai_khoan tk1 ON tk1.id = yc.nguoi_nhan_id
                    JOIN
                        tai_khoan tk2 ON tk2.id = yc.nguoi_yeu_cau_id
                    JOIN
                        danh_muc_tai_san dmts ON dmts.id = ts.danh_muc_tai_san_id
                    JOIN
                        phong_ban pb ON tk1.phong_ban_id = pb.id
                    WHERE
                        tk1.id = ${id};`;

    const data = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    const value = {
      loai_hanh_dong: `Xem thông tin đăng nhập tài sản cá nhân`,
      HanhDongId: user.hanh_dong,
    };
    await ChiTietHanhDong.create(value);
    return data;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const thongBaoHetHan = async (id, user) => {
  try {
    let where = ``;
    let actionDetails = [];

    if (id.phong_ban_id) {
      where = where + `pb.id = ${id.phong_ban_id} AND `;
      const phong_ban = PhongBan.findByPk(id.phong_ban_id);
      actionDetails.push(`phòng ban : ${phong_ban.ten}`);
    }

    const sql = `SELECT
                        ttdn.id,
                        ttdn.thong_tin,
                        ttdn.ngay_cap,
                        ttdn.ngay_thu_hoi,
                        ts.ten_tai_san,
                        ts.ten_nha_cung_cap,
                        pb.ten AS ten_phong_ban,
                        EXTRACT(DAY FROM ( ttdn.ngay_thu_hoi - NOW() )) AS so_ngay_con_lai
                    FROM 
                        thong_tin_dang_nhap_tai_san ttdn
                    JOIN
                        tai_san ts ON ts.id = ttdn.tai_san_id
                    JOIN
                        tai_khoan tk1 ON tk1.id = ttdn.nguoi_nhan_id
                    JOIN
                        phong_ban pb ON tk1.phong_ban_id = pb.id
                    WHERE ${where} ttdn.ngay_thu_hoi - NOW() <= INTERVAL '7 days';`;

    const data = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });
    let moTaHanhDong = "Xem thông báo hết hạn";
    if (actionDetails.length > 0) {
      moTaHanhDong += " với bộ lọc " + actionDetails.join(", ");
    }

    const value = {
      loai_hanh_dong: moTaHanhDong,
      HanhDongId: user.hanh_dong,
    };
    await ChiTietHanhDong.create(value);

    return data;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const patchThongTinDangNhapTaiSan = async (id, data, user) => {
  try {
    const value = await ThongTinDangNhapTaiSan.findByPk(id);
    value.update(data);

    const value2 = {
      loai_hanh_dong: `Cập nhật thông tin đăng nhập tài sản của ${data.NguoiNhan}`,
      HanhDongId: user.hanh_dong,
    };
    await ChiTietHanhDong.create(value2);
  } catch (error) {
    console.log(error);
    return "error";
  }
};

module.exports = {
  postThongTinDangNhapTaiSan,
  patchThongTinDangNhapTaiSan,
  getThongTinDangNhapTaiSan,
  getThongTinTaiSan,
  thongBaoHetHan,
};
