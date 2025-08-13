const {Sequelize} = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize(
    process.env.PG_DATABASE, 
    process.env.PG_USER,
    process.env.PG_PASSWORD, {
    host: process.env.PG_HOST,
    dialect: "postgres",
    timezone: '+07:00',
    define: {
        timestamps: false,
        freezeTableName: true,
        underscored : true
    },
    dialectOptions: {
        charset: 'utf8mb4',
    },
    logging: false
});


sequelize.sync({alter : true});


const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Kết nối thành công DATABASE");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {sequelize, connectToDB};