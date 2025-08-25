const hanhDongService = require('../services/hanh_dong');

const getHanhDong = async (req, res) => {
    try {
        const q = req.query;

        const formatted = {
            userId: q["filters[userId]"] || null,
            phongBanId: q["filters[phongBanId]"] || null,
            startDate: q["filters[startDate]"] || null,
            endDate: q["filters[endDate]"] || null,
            page: q.page || 1,
        };
        const hanhDongs = await hanhDongService.getHanhDong(formatted, req.user, req.query.page);
    
        if (!hanhDongs || hanhDongs.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hành động cho người dùng này' });
        }

        res.json(hanhDongs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};


const getHanhDongById = async (req, res) => {
    try {
  
        const hanhDongs = await hanhDongService.getHanhDongById(req.user.id, req.user, req.query.page);
    
        if (!hanhDongs || hanhDongs.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hành động cho người dùng này' });
        }

        res.json(hanhDongs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};
module.exports = {
    getHanhDong,
    getHanhDongById
};