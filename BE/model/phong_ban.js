const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PhongBan = sequelize.define('PhongBan', {
    ten: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    cap: {
        type: DataTypes.SMALLINT,
        validate: {
            isIn: [[1, 2, 3]]
        }
    }
},{
    tableName: 'phong_ban',
    timestamps: false
});

module.exports = { PhongBan };
