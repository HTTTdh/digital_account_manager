const {authentication} = require("../middleware/auth.js");
const adminRouter = require("express").Router();
const { getHanhDong } = require("../controller/theo_gioi");
const { postYeuCau, patchYeuCau } = require("../controller/yeu_cau");
const { getTaiKhoanForLevel2, getTaiKhoanForLevel1 } = require('../controller/tai_khoan');
const { getDanhMucTaiSan } = require("../controller/danh_muc_tai_san.js");
const phongban = require("../controller/phong_ban");
const hanhDongController = require('../controller/hanh_dong');
const DanhMucTaiSan = require("../controller/danh_muc_tai_san.js");
const taiSanController = require('../controller/tai_san.js');

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

//Xem hành động theo cá nhân theo ngay va theo phong ban --> theo lich su hoat động
adminRouter.get('/hanh_dong/user/:taiKhoanId', hanhDongController.getHanhDongByUser);
adminRouter.get('/hanh_dong/phong_ban/:phongBanId', hanhDongController.getHanhDongByPhongBan);
adminRouter.get('/hanh_dong/date', hanhDongController.getHanhDongByDate);


adminRouter.get('/tai-khoan/level1',authentication, getTaiKhoanForLevel1);
adminRouter.get('/tai-khoan/level2',authentication, getTaiKhoanForLevel2);
adminRouter.get('/nha_cung_caps', getDanhMucTaiSan);


//CRUD phòng ban
adminRouter.get("/phong_ban", authentication, phongban.getPhongBan);
adminRouter.post("/phong_ban", authentication, phongban.addPhongBan);
adminRouter.patch("/phong_ban/:id", authentication, phongban.updatePhongBan);
adminRouter.delete("/phong_ban/:id", authentication, phongban.deletePhongBan);

// CRUD danh mục tài sản
adminRouter.post("/danh_muc_tai_san", authentication, DanhMucTaiSan.addDanhMucTaiSan);
adminRouter.patch("/danh_muc_tai_san/:id", authentication, DanhMucTaiSan.updateDanhMucTaiSan);
adminRouter.delete("/danh_muc_tai_san/:id", authentication, DanhMucTaiSan.deleteDanhMucTaiSan);

//CRUD tài sản
adminRouter.get("/tai_san", authentication, taiSanController.getTaiSan);
adminRouter.post("/tai_san", authentication, taiSanController.addTaiSan);
adminRouter.patch("/tai_san/:id", authentication, taiSanController.updateTaiSan);
adminRouter.delete("/tai_san/:id", authentication, taiSanController.deleteTaiSan);
module.exports = adminRouter;

