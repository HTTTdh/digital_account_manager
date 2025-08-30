const hanhDongService = require('../services/hanh_dong');

const getHanhDong = async (req, res) => {
    try {
        const q = req.query;
        const hanhDongs = await hanhDongService.getHanhDong(q, req.user, req.query.page);
    
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