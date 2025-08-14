const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DanhMucThuongHieu = sequelize.define('DanhMucThuongHieu', {
    ten: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lien_he: DataTypes.STRING(255),
    link: DataTypes.TEXT
}, {
    tableName: 'danh_muc_tai_san',
    timestamps: false
});

module.exports = { DanhMucThuongHieu };
