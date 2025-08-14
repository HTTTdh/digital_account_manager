const Danh_Muc_San_Pham = require("../services/danh_muc_san_pham")


const getDanhMucSanPham = async (req, res) => {
    try {
        const data = await Danh_Muc_San_Pham.getDanhMucSanPham(req.query);
        
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
    getDanhMucSanPham
};
