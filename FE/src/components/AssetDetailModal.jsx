import React from 'react'
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { formatDate } from '@/utils/helpers';
const AssetDetailModal = ({ selectedItem, onClose, onSave }) => {
    const [formData, setFormData] = useState(selectedItem?.thong_tin || {});

    // useEffect(() => {
    //     setFormData(selectedItem?.thong_tin || {});
    // }, [selectedItem]);
    useEffect(() => {
        if (selectedItem) {
            const thong_tin = { ...selectedItem.thong_tin };
            if ("password" in thong_tin) {
                thong_tin.password = "";
            }
            setFormData(thong_tin);
        }
    }, [selectedItem]);

    if (!selectedItem) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Chi tiết đăng nhập</h3>

                {/* Thông tin chung */}
                <div className="space-y-3 text-gray-700">
                    <p><span className="font-semibold">Tài sản: </span>{selectedItem?.ten_tai_san}</p>
                    <p><span className="font-semibold">Người nhận: </span>{selectedItem?.ho_ten_nguoi_nhan}</p>
                    <p><span className="font-semibold">Người yêu cầu: </span>{selectedItem?.ho_ten_nguoi_yeu_cau}</p>
                    <p><span className="font-semibold">Danh mục: </span>{selectedItem?.ten_danh_muc_tai_san}</p>
                    <p><span className="font-semibold">Ngày cấp: </span>{formatDate(selectedItem?.ngay_cap)}</p>
                    <p><span className="font-semibold">Ngày thu hồi: </span>{formatDate(selectedItem?.ngay_thu_hoi)}</p>
                </div>

                {/* Form sửa thông tin */}
                <div className="mt-4 border-t pt-4">
                    <h4 className="text-lg font-semibold mb-2">Thông tin cấp phát:</h4>
                    <div className="space-y-2">
                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                                <label className="font-semibold">{key}</label>
                                <input
                                    type={key === "password" ? "password" : "text"}
                                    value={formData[key] ?? ""}
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, [key]: e.target.value }))
                                    }
                                    className="border rounded p-2 text-gray-700"
                                    placeholder={key === "password" ? "Nhập mật khẩu mới" : ""}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nút hành động */}
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 border rounded">Đóng</button>
                    <button
                        onClick={() => onSave(formData)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssetDetailModal