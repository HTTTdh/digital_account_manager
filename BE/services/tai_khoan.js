const {TaiKhoan} = require("../model/tai_khoan");

// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { Sequelize, Op} = require("sequelize");
// const { sequelize } = require("../config/mysql");
// const {kmeans} = require('ml-kmeans');
// const activeToken = require("../middleware/active_token");
// const sendMail = require("../config/sendMail");
// const { Conversation } = require("../model/conversation");
// const { History_Chat } = require("../model/historychat");

// const loginUser  = async (data) => {
//     try {
//         let user = await TaiKhoan.findOne({
//             where : {
//                 username : data.username
//             }
//         })

//         if(!user){
//             return -1;
//         }
//         else{
//             //const check = await bcryptjs.compare(data.password, user.password);
//             const check = data.password == user.password
//             if(!check){
//                 return -2;
//             }
//             else{
//                 return user;
//             }

//         }

//         await TaiKhoan.create(data)
//     } catch (error) {
//         console.log(error);
//         return "error";
//     }
// }

// const addEmployee  = async (data) => {
//     try {
//         const check = await User.findOne({
//             where : {
//                 email : data.email
//             }
//         });
    
//         if(check){
//             return -1;
//         }
    
//         await User.create(data);
//     } catch (error) {
//         console.log(error);
//     }
// }

const { sequelize } = require("../config/database");
const findforLevel1 = async () => {
    const sql = `SELECT tk.*, pb.ten
                FROM tai_khoan tk
                JOIN phong_ban pb ON tk.phong_ban_id = pb.id
                WHERE tk.cap > 1;`;
    
    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    return results;
};
const findforLevel2 = async () => { 
    const sql = `SELECT tk.*, pb.ten
                FROM tai_khoan tk
                JOIN phong_ban pb ON tk.phong_ban_id = pb.id
                WHERE tk.cap > 2
                AND pb.id = 4`;
    const results = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    return results;
                };
module.exports = {
    findforLevel1, findforLevel2,
};

// có 2 TH:
// 1. cấp 1 xem cấp dưới thì xem tất cả 
// 2. cấp 2 xem cấp 3 thì chỉ hiện chung phòng ban 