const {authentication} = require("../middleware/auth.js");
const adminRouter = require("express").Router();
const { getHanhDong } = require("../controller/theo_gioi");
const { postYeuCau, patchYeuCau } = require("../controller/yeu_cau");
const { getTaiKhoanForLevel2, getTaiKhoanForLevel1 } = require('../controller/tai_khoan');

//amenitie
adminRouter.post("/yeu_cau", postYeuCau);

adminRouter.patch("/yeu_cau", patchYeuCau);

adminRouter.post("/tai_san_so", patchYeuCau);

adminRouter.post("/hanh_dong", getHanhDong);

adminRouter.get('/tai-khoan/level1',authentication, getTaiKhoanForLevel1);
adminRouter.get('/tai-khoan/level2',authentication, getTaiKhoanForLevel2);
module.exports = adminRouter;

