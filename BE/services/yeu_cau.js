const { YeuCau } = require("../model/yeu_cau");
const {
  ThongTinDangNhapTaiSan,
} = require("../model/thong_tin_dang_nhap_tai_san");
const { ChiTietHanhDong } = require("../model/chi_tiet_hanh_dong");
const {HanhDong} = require("../model/hanh_dong");
const { sequelize } = require("../config/database");

const postYeuCau = async (data, user) => {
    try {
        const yeu_cau = await YeuCau.create(data);

        const value = {
            loai_hanh_dong : "Thêm yêu cầu cấp tài sản", 
            HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    await HanhDong.create({TaiKhoanId: user.id});
        return yeu_cau;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getYeuCau = async (user) => {
    try {
        const sql = `SELECT
                        yc.id AS yeu_cau_id,
                        yc.ngay_yeu_cau,
                        yc.trang_thai,
                        yc.noi_dung,
                        ts.id AS tai_san_id,
                        yc.noi_dung,
                        ts.id AS tai_san_id,
                        ts.ten_tai_san AS ten_nha_cung_cap,
                        ts.ten_nha_cung_cap,
                        ts.thong_tin AS ghi_chu,
                        tk2.id AS nguoi_yeu_cau_id,
                        tk2.ho_ten AS nguoi_yeu_cau,
                        tk2.id AS nguoi_dai_dien_id,
                        tk3.ho_ten AS nguoi_nhan,
                        tk3.id AS nguoi_nhan_id,
                        tk1.ho_ten AS nguoi_duyet,
                        pb.ten
                    FROM 
                        yeu_cau yc
                    JOIN 
                        tai_san ts ON yc.tai_san_id = ts.id
                    JOIN 
                        danh_muc_tai_san dmts ON ts.danh_muc_tai_san_id = dmts.id
                    LEFT JOIN
                    LEFT JOIN
                        tai_khoan tk1 ON yc.nguoi_duyet_id = tk1.id 
                    JOIN
                        tai_khoan tk2 ON yc.nguoi_yeu_cau_id = tk2.id
     JOIN
                        tai_khoan tk3 ON yc.nguoi_nhan_id = tk3.id 
                    JOIN
                        phong_ban pb ON pb.id =tk2.phong_ban_id;`;

    const yeu_cau = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

        const value = {
            loai_hanh_dong : "Xem tất cả yêu cầu", 
           HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    await HanhDong.create({TaiKhoanId: user.id});


    return yeu_cau;
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const patchYeuCau = async (id, data, user) => {
    try {
        const yeu_cau = await YeuCau.findByPk(id);
        yeu_cau.update(data);

        const value = {
            loai_hanh_dong : "Cập nhật trạng thái yêu cầu cấp tài sản", 
           HanhDongId: user.hanh_dong
    }
    await ChiTietHanhDong.create(value);
    await HanhDong.create({TaiKhoanId: user.id});
    } catch (error) {
        console.log(error);
        return "error";
    }
}
module.exports = { postYeuCau, getYeuCau, patchYeuCau };