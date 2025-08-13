const Hanh_Dong = require("../services/theo_gioi");

const getHanhDong = async (req, res) => {

    const hanh_dong = await Hanh_Dong.getHanhDong();

    if (hanh_dong == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: "Lịch sử hành động",
            hanh_dong
        })
    }

}


module.exports = { getHanhDong}