const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { LoaiTaiSan } = require('./loai_tai_san');
const { NhaCungCap } = require('./nha_cung_cap');
const { TaiKhoan } = require('./tai_khoan');
const { YeuCau } = require('./yeu_cau');

const TaiSanSo = sequelize.define('TaiSanSo', {
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
    tableName: 'tai_san_so',
    timestamps: false
});


TaiSanSo.belongsTo(NhaCungCap);
NhaCungCap.hasMany(TaiSanSo);

TaiSanSo.belongsTo(LoaiTaiSan);
LoaiTaiSan.hasMany(TaiSanSo);

TaiSanSo.belongsTo(YeuCau);
YeuCau.hasMany(TaiSanSo);


TaiSanSo.belongsTo(TaiKhoan, { as: 'NguoiDaiDien', foreignKey: 'nguoi_dai_dien_id' });
TaiSanSo.belongsTo(TaiKhoan, { as: 'NguoiNhan', foreignKey: 'nguoi_nhan_id' });
module.exports = { TaiSanSo };
