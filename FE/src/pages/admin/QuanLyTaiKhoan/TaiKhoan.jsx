import { useEffect, useState } from "react";
import { UserStore } from "../../../stores/tai_khoan";
import ThemTaiKhoan from "./ThemTaiKhoan";
import { Edit, Eye, Share2, Trash2 } from "lucide-react";

export default function UserManagement() {
    const userStore = UserStore();

    const [tai_khoan, setTaiKhoan] = useState([]);
    const [phong_ban, setPhongBan] = useState([]);
    const [selectedPhongBan, setSelectedPhongBan] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editUser, setEditUser] = useState(false);

    const fetchData = async () => {
        const data_taikhoan = await userStore.findforLevel2();
        const data_phongban = await userStore.getPhongBan();

        setPhongBan(data_phongban.data);
        setTaiKhoan(data_taikhoan);

        console.log("moi", data_taikhoan);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleThemTaiKhoan = async (formData) => {
        try {
            const result = await userStore.themTaiKhoan(formData);
            setShowModal(false);
            setEditUser(null);
            await fetchData();
        } catch (error) {
            console.error("Lỗi thêm tài khoản:", error);
        }
    };

    const handleCapNhatTaiKhoan = async (formData) => {
        try {
            const result = await userStore.suaTaiKhoan(editUser.id, formData);
            setEditUser(null);
            setShowModal(false);

            setTimeout(async () => {
                await fetchData();
            }, 500);
            
        } catch (error) {
            console.error("Lỗi cập nhật tài khoản:", error);
        }
    };

    // Lọc user theo phòng ban
    const filteredUsers = tai_khoan.filter((user) => {
        return (
            selectedPhongBan === "" || user.phong_ban_id === Number(selectedPhongBan)
        );
    });

    return (
        <div className="">
            <div className="grid grid-cols-1 gap-4   p-4 rounded-lg ">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bộ phận
                    </label>
                    <select
                        className="border rounded p-2 w-1/4"
                        value={selectedPhongBan}
                        onChange={(e) => setSelectedPhongBan(e.target.value)}
                    >
                        <option value="">Tất cả bộ phận</option>
                        {phong_ban.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.ten}
                            </option>
                        ))}
                    </select>
                </div>

                <div className=" flex justify-end">
                    <button
                        onClick={() => {
                            setEditUser(null);
                            setShowModal(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 cursor-pointer"
                    >
                        + Thêm tài khoản
                    </button>
                </div>
            </div>

            <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <th className="p-3 text-left">USERNAME</th>
                        <th className="p-3 text-left">HỌ VÀ TÊN</th>
                        <th className="p-3 text-center">CẤP</th>
                        <th className="p-3 text-center">BỘ PHẬN</th>
                        <th className="p-3 text-center">SỐ ĐIỆN THOẠI</th>
                        <th className="p-3 text-center">THAO TÁC</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr
                            key={user.id}
                            className="border-b hover:bg-gray-50 transition-colors"
                        >
                            <td className="p-3 text-left">{user.username}</td>
                            <td className="p-3 text-left">{user.ho_ten}</td>
                            <td className="p-3 text-center">{user.cap || "—"}</td>
                            <td className="p-3 text-center">
                                {phong_ban.find((pb) => pb.id === user.phong_ban_id)?.ten || "Chưa có"}
                            </td>
                            <td className="p-3 text-center">{user.sdt}</td>
                            <td className="p-3 text-center flex space-x-2 justify-center">
                                <button
                                    onClick={() => {
                                        setEditUser(user); 
                                        setShowModal(true); 
                                    }}
                                    className="p-2 border rounded hover:bg-gray-100 hover:cursor-pointer"
                                >
                                    <Edit className="w-4 h-4 text-yellow-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* Modal thêm tài khoản */}
            <ThemTaiKhoan
                showModal={showModal}
                setShowModal={(value) => {
                    setShowModal(value);
                    if (!value) setEditUser(null);
                }}
                phong_ban={phong_ban}
                onSubmit={editUser ? handleCapNhatTaiKhoan : handleThemTaiKhoan}
                editUser={editUser}
            />
        </div>
    );
}
