const {YeuCau} = require("../model/yeu_cau");
const {ThongTinDangNhapTaiSan} = require("../model/thong_tin_dang_nhap_tai_san");
const {ChiTietHanhDong} = require("../model/chi_tiet_hanh_dong");
const { sequelize } = require("../config/database");

const postYeuCau = async (data, hanh_dong) => {
    try {
        const yeu_cau = await YeuCau.create(data);

        const value = {
            loai_hanh_dong : "Thêm yêu cầu cấp tài sản", 
            HanhDongId : hanh_dong
        }


        await ChiTietHanhDong.create(value);


        return yeu_cau;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getYeuCau = async (hanh_dong) => {
    try {
        const sql = `SELECT
                        yc.id AS yeu_cau_id,
                        yc.ngay_yeu_cau,
                        yc.trang_thai,
                        ts.ten_tai_san AS ten_nha_cung_cap,
                        ts.ten_nha_cung_cap,
                        ts.thong_tin AS ghi_chu,
                        tk2.ho_ten AS nguoi_yeu_cau,
                        pb.ten
                    FROM 
                        yeu_cau yc
                    JOIN 
                        tai_san ts ON yc.tai_san_id = ts.id
                    JOIN 
                        danh_muc_tai_san dmts ON ts.danh_muc_tai_san_id = dmts.id
                    JOIN
                        tai_khoan tk1 ON yc.nguoi_duyet_id = tk1.id 
                    JOIN
                        tai_khoan tk2 ON yc.nguoi_yeu_cau_id = tk2.id 
                    JOIN
                        phong_ban pb ON pb.id =tk2.phong_ban_id ;`;

        const yeu_cau = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });

        const value = {
            loai_hanh_dong : "Xem tất cả yêu cầu", 
            HanhDongId : hanh_dong
        }


        await ChiTietHanhDong.create(value);


        return yeu_cau;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const patchYeuCau = async (id, data, hanh_dong) => {
    try {
        const yeu_cau = await YeuCau.findByPk(id);
        yeu_cau.update(data);

        const value = {
            loai_hanh_dong : "Cập nhật trạng thái yêu cầu cấp tài sản", 
            HanhDongId : hanh_dong
        }


        await ChiTietHanhDong.create(value);
    } catch (error) {
        console.log(error);
        return "error";
    }
}

module.exports = {postYeuCau, patchYeuCau, getYeuCau}