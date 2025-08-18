const { authentication } = require("../middleware/auth.js");
const adminRouter = require("express").Router();
const { getHanhDong } = require("../controller/theo_gioi");
const { postYeuCau, patchYeuCau, getYeuCau } = require("../controller/yeu_cau");
const {
  getTaiKhoanForLevel2,
  getTaiKhoanForLevel1,
} = require("../controller/tai_khoan");
const { getDanhMucTaiSan } = require("../controller/danh_muc_tai_san.js");
const {
  postThongTinDangNhapTaiSan,
  patchThongTinDangNhapTaiSan,
  getThongTinTaiSan,
  getThongTinDangNhapTaiSan,
} = require("../controller/thong_tin_dang_nhap_tai_san.js");

adminRouter.post("/yeu_cau", authentication, postYeuCau);
const phongban = require("../controller/phong_ban");
const hanhDongController = require("../controller/hanh_dong");
const DanhMucTaiSan = require("../controller/danh_muc_tai_san.js");
const taiSanController = require("../controller/tai_san.js");

adminRouter.patch("/yeu_cau/:id", authentication, patchYeuCau);

adminRouter.get("/yeu_cau", getYeuCau);

adminRouter.post(
  "/thong_tin_tai_san",
  authentication,
  postThongTinDangNhapTaiSan
);
adminRouter.patch(
  "/thong_tin_tai_san/:id",
  authentication,
  patchThongTinDangNhapTaiSan
);

//Xem thông tin tài sản cá nhân
adminRouter.get("/thong_tin_tai_san", authentication, getThongTinTaiSan);

adminRouter.get(
  "/v1/thong_tin_tai_san",
  authentication,
  getThongTinDangNhapTaiSan
);

// adminRouter.post("/hanh_dong", getHanhDong);
adminRouter.get("/hanh_dong", authentication, hanhDongController.getHanhDong);
adminRouter.get("/hanh_dong", authentication, hanhDongController.getHanhDong);

adminRouter.get("/tai-khoan/level1", authentication, getTaiKhoanForLevel1);
adminRouter.get("/tai-khoan/level2", authentication, getTaiKhoanForLevel2);
adminRouter.get("/nha_cung_caps", getDanhMucTaiSan);

//CRUD phòng ban
adminRouter.get("/phong_ban", authentication, phongban.getPhongBan);
adminRouter.post("/phong_ban", authentication, phongban.addPhongBan);
adminRouter.patch("/phong_ban/:id", authentication, phongban.updatePhongBan);
adminRouter.delete("/phong_ban/:id", authentication, phongban.deletePhongBan);

// CRUD danh mục tài sản
adminRouter.get(
  "/danh_muc_tai_san",
  authentication,
  DanhMucTaiSan.getAllDanhMucTaiSan
);
adminRouter.post(
  "/danh_muc_tai_san",
  //authentication,
  DanhMucTaiSan.addDanhMucTaiSan
);
adminRouter.patch(
  "/danh_muc_tai_san/:id",
  authentication,
  DanhMucTaiSan.updateDanhMucTaiSan
);

adminRouter.delete(
  "/danh_muc_tai_san/:id",
  authentication,
  DanhMucTaiSan.deleteDanhMucTaiSan
);

//CRUD tài sản
adminRouter.get("/tai_san", authentication, taiSanController.getTaiSan);
adminRouter.post("/tai_san", taiSanController.addTaiSan);
adminRouter.patch(
  "/tai_san/:id",
  authentication,
  taiSanController.updateTaiSan
);
adminRouter.delete(
  "/tai_san/:id",
  authentication,
  taiSanController.deleteTaiSan
);
module.exports = adminRouter;
