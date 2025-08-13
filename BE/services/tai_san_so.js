const {TaiSanSo} = require("../model/tai_san_so");


const postTaiSanSo = async (data) => {
    try {
        const tai_san_so = await TaiSanSo.bulkCreate(data);



        return tai_san_so;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getTaiSanSo = async (id) => {
    try {
        // const yeu_cau = await TaiSanSo.findByPk(1);
        // return TaiSanSo;
    } catch (error) {
        console.log(error);
        return "error";
    }
}



module.exports = {postTaiSanSo}