const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {TaiKhoan} = require("../model/tai_khoan");
const { sequelize } = require("../config/database"); 

const registerUser = async (data) => {
  try {

    const check = await TaiKhoan.findOne({
      where: {
        username : data.username
      }
    })

    if (check) {
      return { error: "Username đã tồn tại" };
    }
    const hashed = await bcrypt.hash(data.password, 10);
    data.password = hashed;
    await TaiKhoan.create(data);
    return { success: true };
  } catch (err) {
    console.error("Lỗi registerUser:", err);
    return { error: "Lỗi server" };
  }
};

const loginUser = async (data) => {
  try {
      let user = await TaiKhoan.findOne({
          where : {
                username : data.username
            }
        })
        if(!user){
            return -1;
        }
        else{
            const check = await bcrypt.compare(data.password, user.password);
            if(!check){
                return -2;
            }
            else{
                return user;
            }
        }
        } catch (error) {
        console.log(error);
        return "error";
    }
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) return reject(new Error("Invalid Token"));
      resolve(decoded);
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken
};
