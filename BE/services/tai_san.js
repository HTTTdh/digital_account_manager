const { where } = require('sequelize');
const {TaiSan} = require('../model/tai_san');

const getTaiSan = async ({idDanhMucTaiSan}) => {
    const results = await TaiSan.findAll({
        where: { DanhMucTaiSanId: idDanhMucTaiSan }
    });
    return results;
}

const addTaiSan = async (data) => {
    const newTaiSan = await TaiSan.create(data);
    return newTaiSan;
}
const updateTaiSan = async (id, data) => {
    const taiSan = await TaiSan.findByPk(id);
    if (!taiSan) {
        return new Error("Tài sản không tồn tại");
    }
    await taiSan.update(data);
    return taiSan;
}
const deleteTaiSan = async (id) => {
    const taiSan = await TaiSan.findByPk(id);
    if (!taiSan) {
        return new Error("Tài sản không tồn tại");
    }
    await taiSan.destroy();
    return { message: "Tài sản đã được xóa thành công" };
}

module.exports = { getTaiSan, addTaiSan, updateTaiSan, deleteTaiSan };