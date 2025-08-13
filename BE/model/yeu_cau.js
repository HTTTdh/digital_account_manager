const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { LoaiTaiSan } = require('./loai_tai_san');
const { NhaCungCap } = require('./nha_cung_cap');
const { TaiKhoan } = require('./tai_khoan');

const YeuCau = sequelize.define('YeuCau', {
    noi_dung: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ngay_yeu_cau: {
        type: DataTypes.DATE,
        allowNull: false
    },
    so_luong: DataTypes.INTEGER,
    trang_thai: DataTypes.STRING(50)
}, {
    tableName: 'yeu_cau',
    timestamps: false
});

YeuCau.belongsTo(LoaiTaiSan);
LoaiTaiSan.hasMany(YeuCau);

YeuCau.belongsTo(NhaCungCap);
NhaCungCap.hasMany(YeuCau);

YeuCau.belongsTo(TaiKhoan, { as: 'NguoiDuyet', foreignKey: 'nguoi_duyet_id' });
YeuCau.belongsTo(TaiKhoan, { as: 'NguoiYeuCau', foreignKey: 'nguoi_yeu_cau_id' });

module.exports = { YeuCau };
