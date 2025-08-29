const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PhongBan = sequelize.define('PhongBan', {
    ten: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    schema: 'db_v1',
    tableName: 'phong_ban',
    timestamps: false
});

module.exports = { PhongBan };
