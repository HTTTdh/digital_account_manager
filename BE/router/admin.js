
const adminRouter = require("express").Router();
const { loginUser } = require("../controller/tai_khoan");
const { postYeuCau } = require("../controller/yeu_cau");

//amenitie
adminRouter.post("/yeu_cau", postYeuCau);
adminRouter.post("/login", loginUser);

module.exports = adminRouter;

