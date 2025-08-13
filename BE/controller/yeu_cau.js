const Yeu_Cau = require("../services/yeu_cau");

const postYeuCau = async (req, res) => {

    const yeu_cau = await Yeu_Cau.postYeuCau(req.body);

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
    const yeu_cau = await Yeu_Cau.patchYeuCau(req.params.id ,req.body);

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
module.exports = { postYeuCau, patchYeuCau}