const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const NhaCungCap = sequelize.define('NhaCungCap', {
    ten: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lien_he: DataTypes.STRING(255),
    link: DataTypes.TEXT
}, {
    tableName: 'nha_cung_cap',
    timestamps: false
});

module.exports = { NhaCungCap };
