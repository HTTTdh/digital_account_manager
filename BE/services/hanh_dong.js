const { HanhDong } = require('../model/hanh_dong');
const { ChiTietHanhDong } = require('../model/chi_tiet_hanh_dong');
const { TaiKhoan } = require('../model/tai_khoan');
const { Op } = require('sequelize');
const getHanhDongByUser = async (taiKhoanId) => {
        const hanhDongs = await HanhDong.findAll({
            where: { tai_khoan_id: taiKhoanId },
            include: [
                {
                    model: ChiTietHanhDong,
                    attributes: ['loai_hanh_dong', 'thoi_gian_thuc_hien', 'bang_tac_dong']
                },
                {
                    model: TaiKhoan,
                    attributes: ['id', 'ho_ten', 'username']
                }
            ],
            order: [['thoi_diem_dang_nhap', 'DESC']]
        });

        return hanhDongs;
};

const getHanhDongByPhongBan = async (phongBanId) => {
    const hanhDongs = await TaiKhoan.findAll({
    where: { phong_ban_id: phongBanId },
    include: [
        {
            model: HanhDong,
            attributes: ['id', 'thoi_diem_dang_nhap'],
            include: [
                {
                    model: ChiTietHanhDong,
                    attributes: ['loai_hanh_dong', 'thoi_gian_thuc_hien', 'bang_tac_dong']
                }
            ]
        }
    ],
    order: [[HanhDong, 'thoi_diem_dang_nhap', 'DESC']]
    });
    return hanhDongs;
}

const getHanhDongByDate = async (date) => {
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const hanhDongs = await HanhDong.findAll({
        include: [
            {
                model: ChiTietHanhDong,
                attributes: ['loai_hanh_dong', 'thoi_gian_thuc_hien', 'bang_tac_dong'],
                where: {
                    thoi_gian_thuc_hien: {
                        [Op.gte]: startDate,
                        [Op.lt]: endDate
                    }
                }
            },
            {
                model: TaiKhoan,
                attributes: ['id', 'ho_ten', 'username']
            }
        ],
        order: [[ChiTietHanhDong, 'thoi_gian_thuc_hien', 'DESC']]
    });

    return hanhDongs;
};
module.exports = {
    getHanhDongByUser, getHanhDongByPhongBan, getHanhDongByDate
};