const {authentication} = require("../middleware/auth.js");
const adminRouter = require("express").Router();
const { postYeuCau } = require("../controller/yeu_cau");
const { getTaiKhoanForLevel2, getTaiKhoanForLevel1 } = require('../controller/tai_khoan');

adminRouter.post("/yeu_cau",authentication, postYeuCau);

adminRouter.get('/tai-khoan/level1',authentication, getTaiKhoanForLevel1);
adminRouter.get('/tai-khoan/level2',authentication, getTaiKhoanForLevel2);
module.exports = adminRouter;

