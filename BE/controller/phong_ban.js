const phong_ban = require('../services/phong_ban');

const getPhongBan = async (req, res) => {
    try {
        const data = await phong_ban.getPhongBan(req.user);
        res.status(200).json({
            status: true,
            message: "Danh sách phòng ban",
            data
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng ban:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}

const addPhongBan = async (req, res) => {
    try {
        const newPhongBan = await phong_ban.addPhongBan(req.body, req.user);
        res.status(201).json({
            status: true,
            message: "Thêm phòng ban thành công",
            data: newPhongBan
        });
    } catch (error) {
        console.error("Lỗi khi thêm phòng ban:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}

const updatePhongBan = async (req, res) => {
    try {
        const updatedPhongBan = await phong_ban.updatePhongBan(req.params.id, req.body, req.user);
        if (updatedPhongBan instanceof Error) {
            return res.status(404).json({ message: updatedPhongBan.message });
        }
        res.status(200).json({
            status: true,
            message: "Cập nhật phòng ban thành công",
            data: updatedPhongBan
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật phòng ban:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}

const deletePhongBan = async (req, res) => {
    try {
        const result = await phong_ban.deletePhongBan(req.params.id, req.user);
        if (result instanceof Error) {
            return res.status(404).json({ message: result.message });
        }
        res.status(200).json({
            status: true,
            message: result.message
        });
    } catch (error) {
        console.error("Lỗi khi xóa phòng ban:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}
module.exports = {
    getPhongBan,
    addPhongBan,
    updatePhongBan,
    deletePhongBan
};