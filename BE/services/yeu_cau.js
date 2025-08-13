const {YeuCau} = require("../model/yeu_cau");
const {TaiSanSo} = require("../model/tai_san_so");


const postYeuCau = async (data) => {
    try {
        const yeu_cau = await YeuCau.create(data);
        return yeu_cau;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getYeuCau = async (id) => {
    try {
        // const yeu_cau = await YeuCau.findByPk(1);
        // return YeuCau;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


const patchYeuCau = async (id, data) => {
    try {
        const yeu_cau = await YeuCau.findByPk(id);
        yeu_cau.update(data);
    } catch (error) {
        console.log(error);
        return "error";
    }
}

module.exports = {postYeuCau, patchYeuCau}