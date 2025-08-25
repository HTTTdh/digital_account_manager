// src/components/UpdateModal.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function UpdateModal({ isOpen, onClose, onSubmit, initialData }) {
    const [expiryDate, setExpiryDate] = useState(initialData?.ngay_thu_hoi || "");
    const [status, setStatus] = useState(initialData?.trang_thai || "Đang sử dụng");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ id: initialData.id, ngay_thu_hoi: expiryDate, trang_thai: status });
        onSubmit({ id: initialData.id, ngay_thu_hoi: expiryDate, trang_thai: status });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
            >
                <h2 className="text-lg font-semibold mb-4">Cập nhật tài sản</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Ngày thu hồi</label>
                        <input
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Trạng thái</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full"
                        >
                            <option value="Đang sử dụng">Đang sử dụng</option>
                            <option value="Ngừng sử dụng">Ngừng sử dụng</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
