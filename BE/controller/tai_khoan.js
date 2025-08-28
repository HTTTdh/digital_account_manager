const { findforLevel1, findforLevel2 } = require("../services/tai_khoan");
const getTaiKhoanForLevel1 = async (req, res) => {
    try {
        const taiKhoans = await findforLevel1(req.user, req.query.page);
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
        // console.log("User:", req.user);
        const taiKhoans = await findforLevel2(req.user, req.query.page);
        if (taiKhoans.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy tài khoản" });
        }
        return res.status(200).json(taiKhoans);
    } catch (error) {
        console.error("Lỗi khi lấy tài khoản:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

const getMe = (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Chưa đăng nhập" });
    return res.status(200).json({ user: req.user });
  } catch (err) {
    console.error("Lỗi khi lấy thông tin user:", err);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = {
    getTaiKhoanForLevel2,
    getTaiKhoanForLevel1,
    getMe
};
