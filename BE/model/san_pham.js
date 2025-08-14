const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { NhaCungCap } = require('./nha_cung_cap');

const SanPham = sequelize.define('SanPham', {
    ten_san_pham: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    tong_so_luong : DataTypes.INTEGER,
    so_luong_con : DataTypes.INTEGER
}, {
    tableName: 'san_pham',
    timestamps: false
});

SanPham.belongsTo(NhaCungCap);
NhaCungCap.hasMany(SanPham);

module.exports = { SanPham };
