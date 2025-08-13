const Tai_Khoan = require("../services/tai_khoan");
const tokenCookie = require("../middleware/cookie");

const registerUser = async (req, res) => {
    const user = await User.registerUser(req.body);

    if (user == -1) {
        res.status(404).json({
            status: false,
            message: "Email đã tồn tại"
        })
    }
    else if (user == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            status: true,
            message: `Kiểm tra email : ${req.body.email}`,
            token: user.token,
            otp: user.code
        })
    }

}


const activeUser = async (req, res) => {
    const user = await User.activeUser(req.body);
    if (user == -1) {
        res.status(404).json({
            success: false,
            message: "Mã OTP sai",
        })
    }
    else if (user == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else {
        res.status(201).json({
            success: true,
            message: "Đăng ký thành công",
        })
    }

}





const getUser = async (req, res) => {
    const user = await User.getUser(req.user.id);
    res.status(200).json({
        success: true,
        message: "Thông tin của người dùng",
        user
    });
}




const getAllUser = async (req, res) => {
    const user = await User.getAllUser(req.query.type);
    res.status(200).json({
        success: true,
        message: "Danh sách người dùng",
        user
    });
}

const findUser = async (req, res) => {
    const user = await User.findUser(req.query.search);
    res.status(200).json({
        success: true,
        message: "Danh sách người dùng",
        user
    });
}


const addEmployee = async (req, res) => {
    const user = await User.addEmployee(req.body);
    if(user == -1){
        res.status(404).json({
            success: false,
            message: "Email đã tồn tại"
        });
    }
    res.status(200).json({
        success: true,
        message: "Thêm thành công "
    });
}

const getAllUserGroup = async (req, res) => {
    const user = await User.getAllUserGroup();
    res.status(200).json({
        success: true,
        message: "Danh sách người dùng",
        user
    });
}


const loginUser = async (req, res) => {
    const user = await Tai_Khoan.loginUser(req.body);
    if (user == -1) {
        res.status(404).json({
            success: false,
            message: "Không tìm thấy email"
        });
    }
    else if (user == "error") {
        res.status(505).json("Lỗi hệ thống");
    }
    else if (user == -2) {
        res.status(404).json({
            success: false,
            message: "Sai mật khẩu"
        });
    }
    else {
        tokenCookie(user, 200, res);
    }
}


const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logout thành công "
    });
}


const putUser = async (req, res) => {
    const id = req.user.id;
    const user = await User.putUser(id, req.body);
    if (user == -1) {
        res.status(400).json({
            success: false,
            message: "Mật khẩu cũ không đúng",
        });
    }
    else {
        res.status(200).json({
            success: true,
            message: "Sửa thông tin của người dùng thành công",
        });
    }
}

const getConversation = async (req, res) => {
    const user = await User.getConversation(req.user.id);
    res.status(200).json({
        success: true,
        message: "Mã hội thoại",
        user
    });
}


module.exports = {activeUser, registerUser, loginUser, getUser,  getAllUser, findUser, getAllUserGroup, addEmployee, logout, putUser, getConversation}