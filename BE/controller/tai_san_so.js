const tai_san_so = require("../services/tai_san_so");

const postTaiSanSo = async (req, res) => {

    const tai_san_so = await tai_san_so.postTaiSanSo(req.body, req.user.hanh_dong);

    if (tai_san_so == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Thêm tài khoản số thành công"
        })
    }

}


module.exports = { postTaiSanSo}