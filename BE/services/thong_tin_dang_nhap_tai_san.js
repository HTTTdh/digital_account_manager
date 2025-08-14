const {ThongTinDangNhapTaiSan} = require("../model/thong_tin_dang_nhap_tai_san");
const {HanhDong} = require("../model/hanh_dong");


const postThongTinDangNhapTaiSan = async (data, id) => {
    try {
        const thong_tin_dang_nhap_tai_san = await ThongTinDangNhapTaiSan.bulkCreate(data);
        
        
        //Thêm hành động
        const value = {
            loai_hanh_dong : "Thêm tài sản số", 
            bang_tac_dong : "Tài sản số",
            du_lieu_truoc : "",
            du_lieu_sau  : data,
            hanh_dong_id : id
        }

        await HanhDong.create(value);
        

        return thong_tin_dang_nhap_tai_san;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getThongTinDangNhapTaiSan = async (id) => {
    try {
        // const yeu_cau = await ThongTinDangNhapTaiSan.findByPk(1);
        // return ThongTinDangNhapTaiSan;
    } catch (error) {
        console.log(error);
        return "error";
    }
}



module.exports = {postThongTinDangNhapTaiSan}