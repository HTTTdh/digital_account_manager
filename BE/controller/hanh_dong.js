const hanhDongService = require('../services/hanh_dong');

const getHanhDong = async (req, res) => {
    try {
  
        const hanhDongs = await hanhDongService.getHanhDong(req.query, req.user);
    
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
  
        const hanhDongs = await hanhDongService.getHanhDong(req.user.id, req.user);
    
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