const {
  authentication, requireRole
} = require("../middleware/auth.js");
const adminRouter = require("express").Router();
const {
  postYeuCau,
  patchYeuCau,
  getYeuCau
} = require("../controller/yeu_cau");
const {
  getTaiKhoanForLevel2,
  getTaiKhoanForLevel1,
} = require("../controller/tai_khoan");
const {
  getDanhMucTaiSan
} = require("../controller/danh_muc_tai_san.js");
const {
  postThongTinDangNhapTaiSan,
  patchThongTinDangNhapTaiSan,
  getThongTinTaiSan,
  getThongTinDangNhapTaiSan,
  thongBaoHetHan,
} = require("../controller/thong_tin_dang_nhap_tai_san.js");
const {getMe} = require("../controller/tai_khoan");
adminRouter.post("/yeu_cau", authentication, postYeuCau);
const phongban = require("../controller/phong_ban");
const hanhDongController = require("../controller/hanh_dong");
const DanhMucTaiSan = require("../controller/danh_muc_tai_san.js");
const taiSanController = require("../controller/tai_san.js");
const { getThongBao, addThongBao } = require("../controller/thong_bao.js");

adminRouter.patch("/yeu_cau/:id", authentication, requireRole(2), patchYeuCau);

adminRouter.get("/yeu_cau", authentication, requireRole([1,2]), getYeuCau);
adminRouter.post("/thong_tin_tai_san", authentication, requireRole([1,2]), postThongTinDangNhapTaiSan);
adminRouter.patch("/thong_tin_tai_san/:id", authentication,requireRole(1), patchThongTinDangNhapTaiSan);

//Xem thông tin tài sản cá nhân
adminRouter.get("/thong_tin_tai_san", authentication, getThongTinTaiSan);
adminRouter.get("/thong_bao_het_han", authentication, thongBaoHetHan);

adminRouter.get("/v1/thong_tin_tai_san", authentication, getThongTinDangNhapTaiSan);

adminRouter.get("/hanh_dong", authentication, hanhDongController.getHanhDong);
adminRouter.get(
  "/user/hanh_dong",
  authentication,
  hanhDongController.getHanhDongById
);

//Thêm authen
adminRouter.get("/tai-khoan/level1", authentication, getTaiKhoanForLevel1);
adminRouter.get("/tai-khoan/level2", authentication, getTaiKhoanForLevel2);
adminRouter.get("/nha_cung_caps", getDanhMucTaiSan);

//CRUD phòng ban
adminRouter.get("/phong_ban", authentication, phongban.getPhongBan);
adminRouter.post("/phong_ban", authentication, requireRole(1), phongban.addPhongBan);
adminRouter.patch("/phong_ban/:id", authentication, requireRole(1), phongban.updatePhongBan);
adminRouter.delete("/phong_ban/:id", authentication, requireRole(1), phongban.deletePhongBan);

// CRUD danh mục tài sản
adminRouter.get("/danh_muc_tai_san", authentication, DanhMucTaiSan.getAllDanhMucTaiSan);
adminRouter.post("/danh_muc_tai_san", authentication, requireRole(1), DanhMucTaiSan.addDanhMucTaiSan);
adminRouter.patch("/danh_muc_tai_san/:id", authentication, requireRole(1), DanhMucTaiSan.updateDanhMucTaiSan);
adminRouter.delete("/danh_muc_tai_san/:id", authentication, requireRole(1), DanhMucTaiSan.deleteDanhMucTaiSan);

//CRUD tài sản
adminRouter.get("/tai_san", authentication, taiSanController.getTaiSan);
adminRouter.post("/tai_san", authentication, requireRole([1,2]), taiSanController.addTaiSan);
adminRouter.patch("/tai_san/:id", authentication, requireRole(1), taiSanController.updateTaiSan);
adminRouter.delete("/tai_san/:id", authentication, requireRole(1), taiSanController.deleteTaiSan);


//Thông báo
adminRouter.get("/thong_bao", authentication, getThongBao);
adminRouter.post("/thong_bao", authentication, addThongBao);

adminRouter.get("/me", authentication, getMe);

module.exports = adminRouter;