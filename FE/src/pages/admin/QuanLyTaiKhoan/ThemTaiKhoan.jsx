import { useState } from "react";
import { Eye } from "lucide-react";

export default function ThemTaiKhoan({ showModal, setShowModal, phong_ban, onSubmit }) {

    const [formData, setFormData] = useState({
        id : 7,
        username: "",
        password: "",
        ho_ten: "",
        sdt: "",
        cap: 0,
        PhongBanId: 0,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "cap" || name === "PhongBanId"
                    ? Number(value) || 0
                    : value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        setShowModal(false);
        setFormData({
            username: "",
            password: "",
            ho_ten: "",
            sdt: "",
            cap: 0,
            PhongBanId: 0,
        });
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[500px]">
                <h2 className="text-lg font-semibold mb-4">Thêm tài khoản</h2>

                <div className="space-y-3">
                    {/* Username */}
                    <div className="flex items-center">
                        <label className="w-32 font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border p-2 flex-1 rounded"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center relative">
                        <label className="w-32 font-medium">Password</label>
                        <div className="flex-1 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border p-2 w-full rounded pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                <Eye size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Họ tên */}
                    <div className="flex items-center">
                        <label className="w-32 font-medium">Họ tên</label>
                        <input
                            type="text"
                            name="ho_ten"
                            value={formData.ho_ten}
                            onChange={handleChange}
                            className="border p-2 flex-1 rounded"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div className="flex items-center">
                        <label className="w-32 font-medium">SĐT</label>
                        <input
                            type="text"
                            name="sdt"
                            value={formData.sdt}
                            onChange={handleChange}
                            className="border p-2 flex-1 rounded"
                        />
                    </div>

                    {/* Cấp */}
                    <div className="flex items-center">
                        <label className="w-32 font-medium">Cấp</label>
                        <input
                            type="number"
                            name="cap"
                            value={formData.cap}
                            onChange={handleChange}
                            className="border p-2 flex-1 rounded"
                        />
                    </div>

                    {/* Phòng ban */}
                    <div className="flex items-center">
                        <label className="w-32 font-medium">Phòng ban</label>
                        <select
                            name="PhongBanId"
                            value={formData.PhongBanId}
                            onChange={handleChange}
                            className="border p-2 flex-1 rounded"
                        >
                            <option value="">-- Chọn phòng ban --</option>
                            {phong_ban.map((pb) => (
                                <option key={pb.id} value={pb.id}>
                                    {pb.ten}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 rounded border"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
}
