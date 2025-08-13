const { findforLevel1, findforLevel2 } = require("../services/tai_khoan");
const getTaiKhoanForLevel1 = async (req, res) => {
    try {
        const taiKhoans = await findforLevel1();
        console.log(taiKhoans);
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
    getTaiKhoanForLevel1,
};
