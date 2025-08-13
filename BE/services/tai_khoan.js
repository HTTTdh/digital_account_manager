const {TaiKhoan} = require("../model/tai_khoan");


const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Sequelize, Op} = require("sequelize");
const { sequelize } = require("../config/mysql");
const {kmeans} = require('ml-kmeans');
const activeToken = require("../middleware/active_token");
const sendMail = require("../config/sendMail");
const { Conversation } = require("../model/conversation");
const { History_Chat } = require("../model/historychat");


const getUser  = async (id) => {
    const users = await User.findOne({
        where : {
            id : id
        }
    })
    return users;
}

const getAllUser  = async (type) => {
    const users = await User.findAll({
        where : {
            role : type
        }
    })
    return users;

}

const getAllUserGroup  = async () => {
    const sql = `WITH tmp AS (
                    SELECT
                        b.id AS booking_id,
                        b.total_price,
                        u.id,
                        u.fullname
                    FROM
                        booking b
                    JOIN
                        "user" u ON b.user_id = u.id
                    GROUP BY
                        b.id, u.id
                )
                SELECT
                COUNT(p.booking_id) AS total_booking,
                SUM(p.total_price) AS total_price,
                p.id,
                p.fullname
                FROM
                    tmp p
                GROUP BY
                    p.id, p.fullname;`;

    const user = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });

    const data = user.map(customer => [
        parseInt(customer.total_booking),
        parseInt(customer.total_price),
    ]);

    //3 nhóm
    const result = kmeans(data, 2);

    user.forEach((user, index) => {
        user.cluster = result.clusters[index];
    });
    return user;
}

const findUser  = async (data) => {

    const sql = `SELECT 
                    u.id,
                    u.fullname,
                    u.email,
                    u.image
                    FROM 
                    "user" u
                WHERE
                    u.fullname ILIKE '%${data}%' and u.role = 'customer'`;

    const user = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
    return user;
}


const registerUser = async (data) => {
    try {
        const check = await User.findOne({
            where : {
                email : data.email,
                role : "customer"
            }
        });
    
        if(check){
            return -1;
        }
    
        const user = {
            fullname : data.fullname,
            email    : data.email,
            password : data.password,
            phone    : data.phone,
            role : "customer",
            status : "customer"
        }
    
        const token = activeToken(user);
        const otp = token.code;
        sendMail({
            email : data.email,
            subject : "Xác nhận đăng ký tài khoản",
            message : otp
        })
        return token;
    } catch (error) {
        console.log(error);
        return "error";
    }
}

const getAllEmployee = async () => {
    let employee = await User.findAll({
        where : {
            role : "employee"
        },
        attributes : ["id"]
    })
    employee = employee.map(user => user.dataValues.id);
    return JSON.stringify(employee);

}

const activeUser = async(data) => {
    try {
        const newUser = jwt.verify(data.token, process.env.JWT);
        if(newUser.code != data.code){
            return -1;
        } 
        const user = await User.create(newUser.user);

        const employee = await getAllEmployee();


        //Thêm user_idid
        employee.push(user.id);

        await Conversation.create({conversation_list : employee, UserId : user.id});

        await History_Chat.create({message : "Xin chào, tôi có thể giúp gì cho bạn", sender : "bot", UserId : user.id})
    } catch (error) {
        console.log(error);
        return "error";
    }
}



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



const putUser  = async (id, data) => {
    try {
        const user = await User.findByPk(id);
        if(data.password){
            const check = await bcryptjs.compare(data.password_old, user.password);
            if(check){
                user.update(data);
            }
            else{
                return -1;
            }
        }
        else{
            user.update(data);
        }
    } catch (error) {
        console.log(error);
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


const getConversation  = async (id) => {
    try {
        const user = await Conversation.findOne({
            where : {
                user_id : id
            },
            attributes : ["id"]
        });
    
        return user.id;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getUser, getAllUserGroup, findUser, getAllUser, registerUser, activeUser, loginUser, putUser, addEmployee, activeUser, getConversation}