const jwt = require("jsonwebtoken");
const {HanhDong} = require("../model/hanh_dong")
const tokenCookie = async (user, statusCode, res) => {

    let hanh_dong = await HanhDong.create({ TaiKhoanId: user.id })
    user.dataValues.hanh_dong = hanh_dong.dataValues.id;
    console.log("user 123:", user);
    const token = jwt.sign({user}, process.env.JWT);
    const option = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "strict",
        secure: false,      
    };

    res.cookie("token", token, option);
    


    res.status(statusCode).json({
        success : true,
        message : "Đăng nhập thành công",
        token,
        user
    })

}

module.exports = tokenCookie;