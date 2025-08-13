const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { HanhDong } = require('./hanh_dong');


const ChiTietHanhDong = sequelize.define('ChiTietHanhDong', {
    loai_hanh_dong: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    thoi_gian_thuc_hien: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    du_lieu_truoc: DataTypes.JSONB,
    du_lieu_sau: DataTypes.JSONB,
    bang_tac_dong: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'chi_tiet_hanh_dong',
    timestamps: false
});

ChiTietHanhDong.belongsTo(HanhDong);
HanhDong.hasMany(ChiTietHanhDong);

module.exports = { ChiTietHanhDong };
