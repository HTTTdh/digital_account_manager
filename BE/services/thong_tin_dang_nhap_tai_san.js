const { ThongTinDangNhapTaiSan } = require("../model/thong_tin_dang_nhap_tai_san");
const { HanhDong } = require("../model/hanh_dong");
const { sequelize } = require("../config/database");


const postThongTinDangNhapTaiSan = async (data, id) => {
    try {
        const thong_tin_dang_nhap_tai_san = await ThongTinDangNhapTaiSan.create(data);


        //Thêm hành động
        const value = {
            loai_hanh_dong: "Thêm thông tin đăng nhập tài sản",
            hanh_dong_id: id
        }

        await HanhDong.create(value);


        return thong_tin_dang_nhap_tai_san;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getThongTinDangNhapTaiSan = async (value, user) => {
    try {
        let where = '';
        if(value){
            where = where + 'WHERE';

            if(value.nhan_vien){
                where = where + `tk.id = ${value.nhan_vien}`;
 
            }

            if(value.ten_phong_ban){
                where = where + `pb.ten = ${value.ten_phong_ban}`;
 
            }

            if(value.ten_danh_muc_tai_san){
                where = where + `dmts.ten = ${value.ten_danh_muc_tai_san}`;
 
            }
        }
        const sql = `SELECT
                        ttdn.id,
                        ttdn.thong_tin,
                        ttdn.ngay_cap,
                        ttdn.trang_thai,
                        ttdn.ngay_thu_hoi,
                        ts.ten_tai_san,
                        ts.ten_nha_cung_cap,
                        dmts.ten AS ten_danh_muc_tai_san,
                        tk.ho_ten AS ho_ten_nguoi_nhan,
                        pb.ten AS ten_phong_ban
                    FROM 
                        thong_tin_dang_nhap_tai_san ttdn
                    JOIN
                        tai_san ts ON ts.id = ttdn.tai_san_id
                    JOIN
                        danh_muc_tai_san dmts ON dmts.id = ts.danh_muc_tai_san_id
                    JOIN
                        tai_khoan tk ON tk.id = nguoi_nhan_id
                    JOIN
                        phong_ban pb ON tk.phong_ban_id = pb.id;`;

        const data = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
        return data;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const getThongTinTaiSan = async (id, hanh_dong) => {
    try {
        const sql = `SELECT
                        ttdn.id,
                        ttdn.thong_tin,
                        ttdn.ngay_cap,
                        ttdn.trang_thai,
                        ttdn.ngay_thu_hoi,
                        ts.ten_tai_san,
                        ts.ten_nha_cung_cap,
                        tk.ho_ten AS ho_ten_nguoi_nhan,
                        pb.ten AS ten_phong_ban
                    FROM 
                        thong_tin_dang_nhap_tai_san ttdn
                    JOIN
                        tai_san ts ON ts.id = ttdn.tai_san_id
                    JOIN
                        tai_khoan tk ON tk.id = nguoi_nhan_id
                    JOIN
                        phong_ban pb ON tk.phong_ban_id = pb.id
                    WHERE
                        tk.id = ${id};`;

        const data = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });


        // const value = {
        //     loai_hanh_dong : "Xem thông tin đăng nhập tài sản cá nhân", 
        //     hanh_dong_id : hanh_dong
        // }

        // await HanhDong.create(value);
        return data;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const patchThongTinDangNhapTaiSan = async (id, data, hanh_dong) => {
    try {
        const value = await ThongTinDangNhapTaiSan.findByPk(id);
        value.update(data);

        const value2 = {
            loai_hanh_dong: "Cập nhật thông tin đăng nhập tài sản",
            hanh_dong_id: hanh_dong
        }

        await HanhDong.create(value2);
    } catch (error) {
        console.log(error);
        return "error";
    }
}



module.exports = { postThongTinDangNhapTaiSan, patchThongTinDangNhapTaiSan, getThongTinDangNhapTaiSan, getThongTinTaiSan }