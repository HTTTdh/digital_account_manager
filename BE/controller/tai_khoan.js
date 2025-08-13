const Tai_Khoan = require("../services/tai_khoan");
const tokenCookie = require("../middleware/cookie");
const { findforLevel1, findforLevel2 } = require("../services/tai_khoan");

const addEmployee = async (req, res) => {
    const user = await User.addEmployee(req.body);
    if(user == -1){
        res.status(404).json({
            success: false,
            message: "Email đã tồn tại"
        });
    }
    res.status(200).json({
        success: true,
        message: "Thêm thành công "
    });
}

const loginUser = async (req, res) => {
    const user = await Tai_Khoan.loginUser(req.body);
    if (user == -1) {
        res.status(404).json({
            success: false,
            message: "Không tìm thấy email"
        });
    }
    else if (user == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else if (user == -2) {
        res.status(404).json({
            success: false,
            message: "Sai mật khẩu"
        });
    }
    else {
        tokenCookie(user, 200, res);
    }
}

const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logout thành công "
    });
}
const getTaiKhoanForLevel1 = async (req, res) => {
    try {
        const taiKhoans = await findforLevel1();
        if (taiKhoans.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy tài khoản" });
        }
        return res.status(200).json(taiKhoans);
    } catch (error) {
        console.error("Lỗi khi lấy tài khoản:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

const getTaiKhoanForLevel2 = async (req, res) => {
    try {
        const taiKhoans = await findforLevel2();
        if (taiKhoans.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy tài khoản" });
        }
        return res.status(200).json(taiKhoans);
    } catch (error) {
        console.error("Lỗi khi lấy tài khoản:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = {
    getTaiKhoanForLevel2,
    getTaiKhoanForLevel1
};
module.exports = {loginUser, addEmployee, logout}