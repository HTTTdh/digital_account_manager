const {HanhDong} = require("../model/hanh_dong");
const {ChiTietHanhDong} = require("../model/chi_tiet_hanh_dong");

const getHanhDong = async () => {
    try {
        // const yeu_cau = await HanhDong.findByPk(1);
        // return HanhDong;
    } catch (error) {
        console.log(error);
        return "error";
    }
}



module.exports = {getHanhDong}