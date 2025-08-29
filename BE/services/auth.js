const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TaiKhoan } = require("../model/tai_khoan");
const { sequelize } = require("../config/database");
const { PhongBan } = require("../model/phong_ban");
const { ChiTietHanhDong } = require("../model/chi_tiet_hanh_dong");

const registerUser = async (data, user) => {
    try {

        const check = await TaiKhoan.findOne({
            where: {
                username: data.username
            }
        })

        if (check) {
            return { error: "Username đã tồn tại" };
        }
        const hashed = await bcrypt.hash(data.password, 10);
        data.password = hashed;
        const user = await TaiKhoan.create(data);

        const phongban = await PhongBan.findByPk(data.PhongBanId);
        const value = {
            loai_hanh_dong: `Thêm tài khoản nhân viên : ${data.ho_ten} cấp : ${data.cap} thuộc phòng ban : ${phongban.ten}`,
            HanhDongId: user.hanh_dong
        }
        await ChiTietHanhDong.create(value);

        return { success: true, user: user };
    } catch (err) {
        console.error("Lỗi registerUser:", err);
        return { error: "Lỗi server" };
    }
};

const loginUser = async (data) => {
    try {
        let user = await TaiKhoan.findOne({
            where: {
                username: data.username
            }
        })
        if (!user) {
            return -1;
        }
        else {
            const check = await bcrypt.compare(data.password, user.password);
            if (!check) {
                return -2;
            }
            else {
                return user;
            }
        }

        
    } catch (error) {
        console.log(error);
        return "error";
    }
};

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) return reject(new Error("Invalid Token"));
            resolve(decoded);
        });
    });
};


const updateTaiKhoan = async (id, data, user) => {
    try {
        const tai_khoan = await TaiKhoan.findByPk(id);
        tai_khoan.update(data);

        const value = {
            loai_hanh_dong: `Cập nhật tài khoản nhân viên : ${tai_khoan.ho_ten} cấp : ${tai_khoan.cap}`,
            HanhDongId: user.hanh_dong
        }
        await ChiTietHanhDong.create(value);

        return tai_khoan;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyToken,
    updateTaiKhoan
};
