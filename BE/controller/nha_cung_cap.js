const Nha_Cung_Cap = require("../services/nha_cung_cap");



const getNhaCungCap = async (req, res) => {
    try {
        const data = await Nha_Cung_Cap.getNhaCungCap(req.query);
        
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
    getNhaCungCap
};
