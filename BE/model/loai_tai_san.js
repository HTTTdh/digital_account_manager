const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const LoaiTaiSan = sequelize.define('LoaiTaiSan', {
    loai: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    note: DataTypes.TEXT
}, {
    tableName: 'loai_tai_san',
    timestamps: false
});

module.exports = { LoaiTaiSan };
