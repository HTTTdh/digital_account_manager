const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { TaiKhoan } = require('./tai_khoan');


//ThongBao
const ThongBao = sequelize.define('ThongBao', {
    noi_dung: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    thoi_gian: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'thong_bao',
    timestamps: false
});

ThongBao.belongsTo(TaiKhoan);
TaiKhoan.hasMany(ThongBao);


module.exports = { ThongBao };