const {TaiSanSo} = require("../model/tai_san_so");
const {HanhDong} = require("../model/hanh_dong");


const postTaiSanSo = async (data, id) => {
    try {
        const tai_san_so = await TaiSanSo.bulkCreate(data);
        
        
        //Thêm hành động
        const value = {
            loai_hanh_dong : "Thêm tài sản số", 
            bang_tac_dong : "Tài sản số",
            du_lieu_truoc : "",
            du_lieu_sau  : data,
            hanh_dong_id : id
        }

        await HanhDong.create(value);
        

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