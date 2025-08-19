import { useEffect, useState } from "react";
import { UserStore } from "../../../stores/tai_khoan";
import ThemTaiKhoan from "./ThemTaiKhoan";

export default function UserManagement() {
    const userStore = UserStore();


    const [tai_khoan, setTaiKhoan] = useState([]);


    const [phong_ban, setPhongBan] = useState([]);
    const [selectedPhongBan, setSelectedPhongBan] = useState("");


    const [showModal, setShowModal] = useState(false);


    const fetchData = async () => {
        const data_taikhoan = await userStore.findforLevel2();
        const data_phongban = await userStore.getPhongBan();
        console.log("phong_ban", data_phongban)
        setPhongBan(data_phongban.data);
        console.log("check1", data_taikhoan);
        setTaiKhoan(data_taikhoan);
    };

    useEffect(() => {
        fetchData();
    }, []);



    const handleThemTaiKhoan = async (formData) => {
        try {
            console.log("Form submit:", formData);
            const result = await userStore.themTaiKhoan(formData);
            console.log("Kết quả thêm tài khoản:", result);
            fetchData();
        } catch (error) {
            console.error("Lỗi thêm tài khoản:", error);
        }
    };


    return (
        <div className="p-6">
            <div className="grid grid-cols-1 gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bộ phận
                    </label>
                    <select
                        className="border rounded p-2 w-full"
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

                <div className="mb-4 flex justify-end">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
                    >
                        + Thêm tài khoản
                    </button>
                </div>
            </div>



            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <th className="p-3 text-left">HỌ VÀ TÊN</th>
                        <th className="p-3 text-center">CẤP</th>
                        <th className="p-3 text-center">BỘ PHẬN</th>
                        <th className="p-3 text-center">SỐ ĐIỆN THOẠI</th>
                    </tr>
                </thead>
                <tbody>
                    {tai_khoan.map((user) => (
                        <tr
                            key={user.id}
                            className="border-b hover:bg-gray-50 transition-colors"
                        >
                            <td className="p-3 text-left">{user.ho_ten}</td>
                            <td className="p-3 text-center">{user.cap}</td>
                            <td className="p-3 text-center">{user.ten}</td>
                            <td className="p-3 text-center">{user.sdt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal thêm tài khoản */}
            <ThemTaiKhoan
                showModal={showModal}
                setShowModal={setShowModal}
                phong_ban={phong_ban}
                onSubmit={handleThemTaiKhoan}
            />

        </div>
    );
}
