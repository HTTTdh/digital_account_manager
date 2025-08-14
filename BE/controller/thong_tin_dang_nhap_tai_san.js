const thong_tin_dang_nhap_tai_san = require("../services/thong_tin_dang_nhap_tai_san");

const postThongTinDangNhapTaiSan = async (req, res) => {

    const thong_tin_dang_nhap_tai_san = await thong_tin_dang_nhap_tai_san.postThongTinDangNhapTaiSan(req.body, req.user.hanh_dong);

    if (thong_tin_dang_nhap_tai_san == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Thêm tài khoản số thành công"
        })
    }

}


module.exports = { postThongTinDangNhapTaiSan}