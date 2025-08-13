const { postYeuCau } = require("../controller/yeu_cau");

const adminRouter = require("express").Router();


//amenitie
adminRouter.post("/yeu_cau", postYeuCau);



module.exports = adminRouter;