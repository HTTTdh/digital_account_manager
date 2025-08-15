const hanhDongService = require('../services/hanh_dong');

const getHanhDongByUser = async (req, res) => {
    try {
        const { taiKhoanId } = req.params;

        const hanhDongs = await hanhDongService.getHanhDongByUser(taiKhoanId);

        if (!hanhDongs || hanhDongs.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hành động cho người dùng này' });
        }

        res.json(hanhDongs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

const getHanhDongByPhongBan = async (req, res) => {
    try {
        const { phongBanId } = req.params;
        const hanhDongs = await hanhDongService.getHanhDongByPhongBan(phongBanId);

        if (!hanhDongs || hanhDongs.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hành động cho phòng ban này' });
        }
        res.json(hanhDongs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

const getHanhDongByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const hanhDongs = await hanhDongService.getHanhDongByDate(date);
        if (!hanhDongs || hanhDongs.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hành động cho ngày này' });
        }
        res.json(hanhDongs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
module.exports = {
    getHanhDongByUser, getHanhDongByDate, getHanhDongByPhongBan
};