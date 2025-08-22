const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { TaiSan } = require("./tai_san");
const { TaiKhoan } = require("./tai_khoan");

const YeuCau = sequelize.define(
  "YeuCau",
  {
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ngay_yeu_cau: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    trang_thai: {
      type: DataTypes.STRING(50),
      defaultValue: "đang chờ duyệt",
    },
    ly_do_tu_choi: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "yeu_cau",
    timestamps: false,
  }
);

YeuCau.belongsTo(TaiSan);
TaiSan.hasMany(YeuCau);

YeuCau.belongsTo(TaiKhoan, { as: "NguoiDuyet", foreignKey: "nguoi_duyet_id" });
YeuCau.belongsTo(TaiKhoan, {
  as: "NguoiYeuCau",
  foreignKey: "nguoi_yeu_cau_id",
});
YeuCau.belongsTo(TaiKhoan, { as: "NguoiNhan", foreignKey: "nguoi_nhan_id" });

module.exports = { YeuCau };
