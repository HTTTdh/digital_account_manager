const adminRouter = require("express").Router();
const { loginUser } = require("../controller/tai_khoan");
const { getHanhDong } = require("../controller/theo_gioi");
const { postYeuCau, patchYeuCau } = require("../controller/yeu_cau");

//amenitie
adminRouter.post("/yeu_cau", postYeuCau);
adminRouter.post("/login", loginUser);



















adminRouter.patch("/yeu_cau", patchYeuCau);



adminRouter.post("/tai_san_so", patchYeuCau);


adminRouter.post("/hanh_dong", getHanhDong);

module.exports = adminRouter;

