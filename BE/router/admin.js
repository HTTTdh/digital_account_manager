const {authentication} = require("../middleware/auth.js");
const adminRouter = require("express").Router();
const { getHanhDong } = require("../controller/theo_gioi");
const { postYeuCau, patchYeuCau } = require("../controller/yeu_cau");
const { getTaiKhoanForLevel2, getTaiKhoanForLevel1 } = require('../controller/tai_khoan');
const { getDanhMucTaiSan } = require("../controller/danh_muc_tai_san.js");

//amenitie
adminRouter.post("/yeu_cau", postYeuCau);

adminRouter.patch("/yeu_cau", patchYeuCau);

//Thiếu em yêu cầu


//Tạo thông tin đăng nhập tài sản
adminRouter.post("/thong_tin_dang_nhap_tai_san", patchYeuCau);

//Thêm thông tin đăng nhập tài sản
//Xem thông tin tài sản cá nhân
//Xem thông tin tài sản : IT xem
//Lọc theo phòng ban, lọc theo danh mục tài sản, Lọc theo cá nhân (đã được cấp những tài sản nào)

//Thu hồi tài sản cá nhân


adminRouter.post("/hanh_dong", getHanhDong);

//Xem hành động theo cá nhân


adminRouter.get('/tai-khoan/level1',authentication, getTaiKhoanForLevel1);
adminRouter.get('/tai-khoan/level2',authentication, getTaiKhoanForLevel2);
adminRouter.get('/nha_cung_caps', getDanhMucTaiSan);


//CRUD phòng ban




module.exports = adminRouter;

