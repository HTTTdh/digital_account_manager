const DanhMucTaiSan = require("../services/danh_muc_tai_san")
const YeuCau = require("../services/yeu_cau");

const getDanhMucTaiSan = async (req, res) => {
    try {
        const data = await DanhMucTaiSan.getDanhMucTaiSan(req.query, req.user);
        
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
const getAllDanhMucTaiSan = async (req, res) => {
    try {
        const data = await DanhMucTaiSan.getAllDanhMucTaiSan(req.user);
        res.status(201).json({
            status: true,
            message: "Danh sách danh mục tài sản",
            data
        });
    }
    catch (error) {
        console.error("Lỗi khi lấy danh mục tài sản:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};
const addDanhMucTaiSan = async (req, res) => {
    try {
        const data = await DanhMucTaiSan.addDanhMucTaiSan(req.body, req.user);
        // await YeuCau.postYeuCau(req.body, req.user.hanh_dong);
        res.status(201).json({
            status: true,
            message: "Thêm danh mục tài sản thành công",
            data
        });
    } catch (error) {
        console.error("Lỗi khi thêm danh mục tài sản:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

const updateDanhMucTaiSan = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await DanhMucTaiSan.updateDanhMucTaiSan(id, req.body, req.user);
        res.status(200).json({
            status: true,
            message: "Cập nhật danh mục tài sản thành công",
            data
        });
    }
    catch (error) {
        console.error("Lỗi khi cập nhật danh mục tài sản:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

const deleteDanhMucTaiSan = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await DanhMucTaiSan.deleteDanhMucTaiSan(id, req.user);
        res.status(200).json({
            status: true,
            message: "Xóa danh mục tài sản thành công",
            data
        });
    }
    catch (error) {
        console.error("Lỗi khi xóa danh mục tài sản:", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = {
    getDanhMucTaiSan, addDanhMucTaiSan,
    updateDanhMucTaiSan, deleteDanhMucTaiSan,
    getAllDanhMucTaiSan
};
