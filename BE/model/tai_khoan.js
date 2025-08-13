const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { PhongBan } = require('./phong_ban');

const TaiKhoan = sequelize.define('TaiKhoan', {
    
    username: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    ho_ten: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    sdt: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cap: {
        type: DataTypes.SMALLINT,
        validate: {
            isIn: [[1, 2, 3]]
        }
    }
}, {
    tableName: 'tai_khoan',
    timestamps: false
});


TaiKhoan.belongsTo(PhongBan);
PhongBan.hasMany(TaiKhoan);





module.exports = { TaiKhoan };
