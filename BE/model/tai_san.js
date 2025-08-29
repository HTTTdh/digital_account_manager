const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { DanhMucTaiSan } = require('./danh_muc_tai_san');


//tai_san
const TaiSan = sequelize.define('TaiSan', {
    ten_tai_san: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    ten_nha_cung_cap: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    //thông tin động
    thong_tin: {
        type: DataTypes.JSON,
        allowNull: false
    },
    tong_so_luong : DataTypes.INTEGER,
    so_luong_con : DataTypes.INTEGER,
    type : DataTypes.BOOLEAN
}, {
    schema: 'db_v1',
    tableName: 'tai_san',
    timestamps: false
});

TaiSan.belongsTo(DanhMucTaiSan);
DanhMucTaiSan.hasMany(TaiSan);


module.exports = { TaiSan };
