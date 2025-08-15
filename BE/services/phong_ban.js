const {PhongBan} = require("../model/phong_ban");

const getPhongBan = async () => { 
    const results = await PhongBan.findAll();
    return results;
}

const addPhongBan = async (data) => {
        const newPhongBan = await PhongBan.create(data);
        return newPhongBan;
}
const updatePhongBan = async (id, data) => {
        const phongBan = await PhongBan.findByPk(id);
        if (!phongBan) {
            return new Error("Phòng ban không tồn tại");
        }
        await phongBan.update(data);
        return phongBan;
}
const deletePhongBan = async (id) => { 
        const phongBan = await PhongBan.findByPk(id);
        if (!phongBan) {
            return new Error("Phòng ban không tồn tại");
        }
        await phongBan.destroy();
        return { message: "Phòng ban đã được xóa thành công" };
}
module.exports = { getPhongBan, addPhongBan, updatePhongBan, deletePhongBan };