const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { LoaiTaiKhoan } = require('./loai_tai_khoan');
const { NhaCungCap } = require('./nha_cung_cap');
const { TaiKhoan } = require('./tai_khoan');
const { YeuCau } = require('./yeu_cau');

const TaiKhoanSo = sequelize.define('TaiKhoanSo', {
    username: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fa_2: DataTypes.STRING(255),
    link_dang_nhap: DataTypes.TEXT,
    ngay_cap: DataTypes.DATE,
    ngay_het_han: DataTypes.DATE
}, {
    tableName: 'tai_khoan_so',
    timestamps: false
});


TaiKhoanSo.belongsTo(NhaCungCap);
NhaCungCap.hasMany(TaiKhoanSo);

TaiKhoanSo.belongsTo(LoaiTaiKhoan);
LoaiTaiKhoan.hasMany(TaiKhoanSo);

TaiKhoanSo.belongsTo(YeuCau);
YeuCau.hasMany(TaiKhoanSo);


TaiKhoanSo.belongsTo(TaiKhoan, { as: 'NguoiDaiDien', foreignKey: 'nguoi_dai_dien_id' });
TaiKhoanSo.belongsTo(TaiKhoan, { as: 'NguoiNhan', foreignKey: 'nguoi_nhan_id' });
module.exports = { TaiKhoanSo };
