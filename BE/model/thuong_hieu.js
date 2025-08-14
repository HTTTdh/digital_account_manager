const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { DanhMucThuongHieu } = require('./danh_muc_tai_san');

const ThuongHieu = sequelize.define('ThuongHieu', {
    ten_thuong_hieu: {
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
    tableName: 'thuong_hieu',
    timestamps: false
});

ThuongHieu.belongsTo(DanhMucThuongHieu);
DanhMucThuongHieu.hasMany(ThuongHieu);

module.exports = { ThuongHieu };
