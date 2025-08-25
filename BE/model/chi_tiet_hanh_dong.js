const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { HanhDong } = require("./hanh_dong");

const ChiTietHanhDong = sequelize.define(
  "ChiTietHanhDong",
  {
    loai_hanh_dong: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    thoi_gian_thuc_hien: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    tableName: "chi_tiet_hanh_dong",
    timestamps: false,
  }
);

ChiTietHanhDong.belongsTo(HanhDong);
HanhDong.hasMany(ChiTietHanhDong);

module.exports = { ChiTietHanhDong };
