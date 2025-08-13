const jwt = require("jsonwebtoken");
const {HanhDong} = require("../model/hanh_dong")
const tokenCookie = async (user, statusCode, res) => {
    const token = jwt.sign({user}, process.env.JWT);

    const option = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: false,
        sameSite: "strict",
        secure: false,      
    };

    res.cookie("token", token, option);
    
    let hanh_dong;
    //Tạo hành động
    if(user.cap == 1){
        hanh_dong = await HanhDong.create({tai_khoan_id : user.id})
        hanh_dong = hanh_dong.id;
    }


    res.status(statusCode).json({
        success : true,
        message : "Đăng nhập thành công",
        token
    })


}

module.exports = tokenCookie;