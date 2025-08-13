const { registerUser, loginUser } = require("../services/auth");
const tokenCookie = require("../middleware/cookie");
const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: "Đăng ký thành công." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
    const user = await loginUser(req.body);
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

module.exports = {
  register,
  login,
  logout,
};
