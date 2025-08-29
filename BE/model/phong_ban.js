const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PhongBan = sequelize.define('PhongBan', {
    ten: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    soluong: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    tableName: 'phong_ban',
    timestamps: false
});

module.exports = { PhongBan };
