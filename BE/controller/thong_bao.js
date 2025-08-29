const thongBaoService = require("../services/thong_bao");

const getThongBao = async (req, res) => {
    try {
        const data = await thongBaoService.getThongBao(req.user);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const addThongBao = async (req, res) => {
    try {
        const data = await thongBaoService.addThongBao(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




module.exports = {
    getThongBao,
    addThongBao,
};
