const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DanhMucSanPham = sequelize.define('DanhMucSanPham', {
    ten: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lien_he: DataTypes.STRING(255),
    link: DataTypes.TEXT
}, {
    tableName: 'danh_muc_san_pham',
    timestamps: false
});

module.exports = { DanhMucSanPham };
