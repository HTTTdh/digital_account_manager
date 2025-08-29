const ThongTinDangNhapTaiSan = require("../services/thong_tin_dang_nhap_tai_san");

const postThongTinDangNhapTaiSan = async (req, res) => {
    const thong_tin_dang_nhap_tai_san =
        await ThongTinDangNhapTaiSan.postThongTinDangNhapTaiSan(req.body, req.user);

    if (thong_tin_dang_nhap_tai_san == "error") {
        res.status(505).json("Lỗi hệ thống");
    } else {
        res.status(201).json({
            status: true,
            message: "Thêm thông tin đăng nhập tài sản thành công",
            data: thong_tin_dang_nhap_tai_san,
        });
    }
};

//Xem tài sản cá nhân
const getThongTinTaiSan = async (req, res) => {
    const value = await ThongTinDangNhapTaiSan.getThongTinTaiSan(
        req.user.id,
        req.user,
        req.query.page
    );

    if (value == "error") {
        res.status(505).json("Lỗi hệ thống");
    } else {
        res.status(201).json({
            status: true,
            message: "Danh sách tài sản cá nhân",
            value,
        });
    }
};

//IT xem
const thongBaoHetHan = async (req, res) => {
    const value = await ThongTinDangNhapTaiSan.thongBaoHetHan(
        req.query,
        req.user
    );

    if (value == "error") {
        res.status(505).json("Lỗi hệ thống");
    } else {
        res.status(201).json({
            status: true,
            message: "Thông báo hết hạn",
            value,
        });
    }
};

const getThongTinDangNhapTaiSan = async (req, res) => {
    const value = await ThongTinDangNhapTaiSan.getThongTinDangNhapTaiSan(
        req.query,
        req.user
    );

    if (value == "error") {
        res.status(505).json("Lỗi hệ thống");
    } else {
        res.status(201).json({
            status: true,
            message: "Danh sách thông tin đăng nhập tài sản",
            value,
        });
    }
};

const patchThongTinDangNhapTaiSan = async (req, res) => {
    const thong_tin_dang_nhap_tai_san =
        await ThongTinDangNhapTaiSan.patchThongTinDangNhapTaiSan(
            req.params.id,
            req.body,
            req.user
        );

    if (thong_tin_dang_nhap_tai_san == "error") {
        res.status(505).json("Lỗi hệ thống");
    } else {
        res.status(201).json({
            status: true,
            message: "Sửa thông tin đăng nhập tài sản thành công",
        });
    }
};

module.exports = {
    postThongTinDangNhapTaiSan,
    patchThongTinDangNhapTaiSan,
    getThongTinDangNhapTaiSan,
    getThongTinTaiSan,
    thongBaoHetHan,
};
