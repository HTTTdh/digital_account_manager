const { YeuCau } = require("../model/yeu_cau");
const { ChiTietHanhDong } = require("../model/chi_tiet_hanh_dong");
const { sequelize } = require("../config/database");
const { TaiKhoan } = require("../model/tai_khoan");
const { ThongBao } = require("../model/thong_bao");
const postYeuCau = async (data, user) => {
  try {
    const yeu_cau = await YeuCau.create(data);

    const value = {
      loai_hanh_dong: `Thêm yêu cầu cấp tài sản cho ${data.NguoiNhan}`,
      HanhDongId: user.hanh_dong,
    };
    await ChiTietHanhDong.create(value);
    return yeu_cau;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const getYeuCau = async (user) => {
  try {
    const sql = `SELECT
                    yc.id AS yeu_cau_id,
                    yc.ngay_yeu_cau,
                    yc.trang_thai,
                    yc.noi_dung,
                    yc.ly_do_tu_choi,
                    ts.id AS tai_san_id,
                    ts.ten_tai_san,
                    ts.ten_nha_cung_cap,
                    ts.thong_tin AS ghi_chu,
                    tk2.id AS nguoi_yeu_cau_id,
                    tk2.ho_ten AS nguoi_yeu_cau,
                    tk3.ho_ten AS nguoi_nhan,
                    tk3.id AS nguoi_nhan_id,
                    tk1.ho_ten AS nguoi_duyet,
                    pb.ten,
                    dmts.ten AS ten_danh_muc_tai_san
                    FROM 
                        "db_v1".yeu_cau yc
                    JOIN 
                        "db_v1".tai_san ts ON yc.tai_san_id = ts.id
                    JOIN 
                        "db_v1".danh_muc_tai_san dmts ON ts.danh_muc_tai_san_id = dmts.id
                    LEFT JOIN
                        "db_v1".tai_khoan tk1 ON yc.nguoi_duyet_id = tk1.id 
                    JOIN
                        "db_v1".tai_khoan tk2 ON yc.nguoi_yeu_cau_id = tk2.id
                    JOIN
                        "db_v1".tai_khoan tk3 ON yc.nguoi_nhan_id = tk3.id 
                    JOIN
                        "db_v1".phong_ban pb ON pb.id =tk2.phong_ban_id
                    ORDER BY yc.ngay_yeu_cau DESC;`;

    const yeu_cau = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    const value = {
      loai_hanh_dong: "Hiển thị tất cả yêu cầu",
      HanhDongId: user.hanh_dong,
    };
    await ChiTietHanhDong.create(value);

    return yeu_cau;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const patchYeuCau = async (id, data, user) => {
  try {
    console.log("yeucau", data);
    const yeu_cau = await YeuCau.findByPk(id);
    const nguoi_yeu_cau = await TaiKhoan.findByPk(yeu_cau.nguoi_yeu_cau_id);
    console.log(nguoi_yeu_cau)
    yeu_cau.update(data);
    if (data.trang_thai === "đã duyệt") {
      const value1 = {
            noi_dung: `Yêu cầu của bạn với nội dung ${yeu_cau.noi_dung} đã được phê duyệt`,
            TaiKhoanId: nguoi_yeu_cau.dataValues.id
      }
      console.log(value1)
      await ThongBao.create(value1);
    } else if (data.trang_thai === "từ chối") {
      const value1 = {
            noi_dung: `Yêu cầu của bạn với nội dung ${yeu_cau.noi_dung} đã từ chối với lý do ${data.ly_do_tu_choi}`,
            TaiKhoanId: nguoi_yeu_cau.id
      }
      await ThongBao.create(value1);
    }
    const value = {
      loai_hanh_dong: `Cập nhật trạng thái yêu cầu cấp tài sản của ${data.NguoiYeuCau} cho nhân viên ${data.NguoiNhan}`,
      HanhDongId: user.hanh_dong,
    };
    await ChiTietHanhDong.create(value);
  } catch (error) {
    console.log(error);
    return "error";
  }
};
module.exports = { postYeuCau, getYeuCau, patchYeuCau };
