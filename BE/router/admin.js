const {authentication} = require("../middleware/auth.js");
const adminRouter = require("express").Router();
const { getHanhDong } = require("../controller/theo_gioi");
const { postYeuCau, patchYeuCau, getYeuCau } = require("../controller/yeu_cau");
const { getTaiKhoanForLevel2, getTaiKhoanForLevel1 } = require('../controller/tai_khoan');
const { getDanhMucTaiSan } = require("../controller/danh_muc_tai_san.js");
const { postThongTinDangNhapTaiSan, patchThongTinDangNhapTaiSan, getThongTinTaiSan, getThongTinDangNhapTaiSan } = require("../controller/thong_tin_dang_nhap_tai_san.js");


adminRouter.post("/yeu_cau", authentication, postYeuCau);

adminRouter.patch("/yeu_cau/:id", authentication, patchYeuCau);

adminRouter.get("/yeu_cau", getYeuCau);



adminRouter.post("/thong_tin_tai_san", authentication, postThongTinDangNhapTaiSan);
adminRouter.patch("/thong_tin_tai_san/:id", authentication, patchThongTinDangNhapTaiSan);

//Xem thông tin tài sản cá nhân
adminRouter.get("/thong_tin_tai_san", authentication, getThongTinTaiSan);

adminRouter.get("/v1/thong_tin_tai_san", authentication, getThongTinDangNhapTaiSan);




//Xem thông tin tài sản : IT xem
//Lọc theo phòng ban, lọc theo danh mục tài sản, Lọc theo cá nhân (đã được cấp những tài sản nào)



adminRouter.post("/hanh_dong", getHanhDong);

//Xem hành động theo cá nhân


adminRouter.get('/tai-khoan/level1',authentication, getTaiKhoanForLevel1);
adminRouter.get('/tai-khoan/level2',authentication, getTaiKhoanForLevel2);
adminRouter.get('/nha_cung_caps', getDanhMucTaiSan);


//CRUD phòng ban



//code tiếp new_brand1

module.exports = adminRouter;

