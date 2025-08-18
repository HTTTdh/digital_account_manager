const Yeu_Cau = require("../services/yeu_cau");

const postYeuCau = async (req, res) => {

    req.body.nguoi_yeu_cau_id = req.user.id;
    const yeu_cau = await Yeu_Cau.postYeuCau(req.body, req.user.hanh_dong);

    if (yeu_cau == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Thêm yêu cầu thành công"
        })
    }


}


const patchYeuCau = async (req, res) => {
    req.body.nguoi_duyet_id = req.user.id;
    const yeu_cau = await Yeu_Cau.patchYeuCau(req.params.id, req.body, req.user.hanh_dong);

    if (yeu_cau == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Cập nhật yêu cầu thành công"
        })
    }

}


const getYeuCau = async (req, res) => {

    console.log(req.user.hanh_dong);
    const yeu_cau = await Yeu_Cau.getYeuCau(req.user.hanh_dong);

    if (yeu_cau == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Danh sách yêu cầu",
            yeu_cau
        })
    }

}
module.exports = { postYeuCau, patchYeuCau, getYeuCau}