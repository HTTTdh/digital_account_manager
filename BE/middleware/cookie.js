const jwt = require("jsonwebtoken");

const tokenCookie = async (user, statusCode, res) => {
    const token = jwt.sign({user}, process.env.JWT);

    const option = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: false,
        sameSite: "strict",
        secure: false,
    };

    res.cookie("token", token, option);
    const role = user.role;
    res.status(statusCode).json({
        success : true,
        message : "Đăng nhập thành công",
        token,
        role
    })
}

module.exports = tokenCookie;