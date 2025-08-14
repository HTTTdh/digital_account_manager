const danh_muc_tai_san = require("../services/danh_muc_tai_san")


const getDanhMucThuongHieu = async (req, res) => {
    try {
        const data = await danh_muc_tai_san.getDanhMucThuongHieu(req.query);
        
        res.status(201).json({
            status: true,
            message: "Danh sách nhà cung cấp",
            data
        })
    } catch (error) {
        console.error("Lỗi khi lấy tài khoản:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};



module.exports = {
    getDanhMucThuongHieu
};
