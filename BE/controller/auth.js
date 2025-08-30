const { registerUser, loginUser, updateTaiKhoan } = require("../services/auth");
const tokenCookie = require("../middleware/cookie");
const register = async (req, res) => {
    try {
        const result = await registerUser(req.body, req.user);
        if (!result.success) {
            return res.status(400).json({status: false, error: result.error });
        }
        res.status(201).json({status:true, message: "Đăng ký thành công.", user: result.user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const user = await loginUser(req.body, req.user);
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
};

const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Đăng xuất thành công" });
};

const update = async (req, res) => {
    const data = await updateTaiKhoan(req.params.id, req.body, req.user);

    res.status(200).json({
        status: true,
        message: "Cập nhật tài khoản thành công",
        data
    });
};


module.exports = {
    register,
    login,
    logout,
    update
};
