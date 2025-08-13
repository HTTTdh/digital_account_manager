const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const LoaiTaiKhoan = sequelize.define('LoaiTaiKhoan', {
    loai: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    note: DataTypes.TEXT
}, {
    tableName: 'loai_tai_khoan',
    timestamps: false
});

module.exports = { LoaiTaiKhoan };
