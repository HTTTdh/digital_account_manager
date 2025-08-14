const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { DanhMucSanPham } = require('./danh_muc_san_pham');

const SanPham = sequelize.define('SanPham', {
    ten_san_pham: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nha_cung_cap: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tong_so_luong : DataTypes.INTEGER,
    so_luong_con : DataTypes.INTEGER
}, {
    tableName: 'san_pham',
    timestamps: false
});

SanPham.belongsTo(DanhMucSanPham);
DanhMucSanPham.hasMany(SanPham);

module.exports = { SanPham };
