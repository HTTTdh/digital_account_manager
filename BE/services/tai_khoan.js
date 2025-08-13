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

const loginUser  = async (data) => {
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
            //const check = await bcryptjs.compare(data.password, user.password);
            const check = data.password == user.password
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
}

const addEmployee  = async (data) => {
    try {
        const check = await User.findOne({
            where : {
                email : data.email
            }
        });
    
        if(check){
            return -1;
        }
    
        await User.create(data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {loginUser, addEmployee}