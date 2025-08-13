const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { TaiKhoan } = require('./tai_khoan');

const PhanCap = sequelize.define('PhanCap', {
    cap: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'phan_cap',
    timestamps: false
});

TaiKhoan.belongsToMany(TaiKhoan, {
    as: 'CapDuoi',
    through: PhanCap,
    foreignKey: 'cap_tren',
    otherKey: 'cap_duoi'
});

TaiKhoan.belongsToMany(TaiKhoan, {
    as: 'CapTren',
    through: PhanCap,
    foreignKey: 'cap_duoi',
    otherKey: 'cap_tren'
});

module.exports = { PhanCap };
