const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { TaiKhoan } = require('./tai_khoan');

const HanhDong = sequelize.define('HanhDong', {
    thoi_diem_dang_nhap: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'hanh_dong',
    timestamps: false
});

HanhDong.belongsTo(TaiKhoan);
TaiKhoan.hasMany(HanhDong);

module.exports = { HanhDong };
