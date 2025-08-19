const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { TaiSan } = require("./tai_san");
const { TaiKhoan } = require("./tai_khoan");

//thông tin đăng nhập tài sản
const ThongTinDangNhapTaiSan = sequelize.define(
  "ThongTinDangNhapTaiSan",
  {
    thong_tin: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    ngay_cap: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    trang_thai: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "Đang sử dụng",
    },
    ngay_thu_hoi: DataTypes.DATE,
  },
  {
    tableName: "thong_tin_dang_nhap_tai_san",
    timestamps: false,
  }
);

ThongTinDangNhapTaiSan.belongsTo(TaiSan);
TaiSan.hasMany(ThongTinDangNhapTaiSan);

ThongTinDangNhapTaiSan.belongsTo(TaiKhoan, {
  as: "NguoiDaiDien",
  foreignKey: "nguoi_dai_dien_id",
});
ThongTinDangNhapTaiSan.belongsTo(TaiKhoan, {
  as: "NguoiNhan",
  foreignKey: "nguoi_nhan_id",
});

module.exports = { ThongTinDangNhapTaiSan };
