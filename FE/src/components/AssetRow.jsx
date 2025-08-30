import React from 'react'
import { formatDate } from '@/utils/helpers';
import { Eye, Pencil } from 'lucide-react';
const AssetRow = ({ item, onView, onEdit }) => {
    const statusClass =
        item?.trang_thai?.toLowerCase() === "đang sử dụng"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800";

    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900">{item?.ten_tai_san}</td>
            <td className="px-6 py-4">{item?.ho_ten_nguoi_nhan}</td>
            <td className="px-6 py-4">{item?.ten_phong_ban}</td>
            <td className="px-6 py-4">{formatDate(item?.ngay_cap)}</td>
            <td className="px-6 py-4">{formatDate(item?.ngay_thu_hoi)}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusClass}`}>
                    {item?.trang_thai}
                </span>
            </td>
            <td className="px-6 py-4 text-center flex justify-center gap-3">
                <button onClick={() => onView(item)} className="text-blue-600 hover:text-blue-800 cursor-pointer" title="Xem chi tiết">
                    <Eye className="w-5 h-5" />
                </button>
                <button onClick={() => onEdit(item)} className="text-green-600 hover:text-green-800 cursor-pointer" title="Sửa thông tin">
                    <Pencil className="w-5 h-5" />
                </button>
            </td>
        </tr>
    );
};


export default AssetRow