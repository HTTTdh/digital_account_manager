import React from 'react'
import { User } from 'lucide-react'
const UserInfo = ({ user }) => {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 text-lg">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">Thông tin người dùng</span>
            </div>
            <div className="bg-white/60 p-3 rounded-lg space-y-2">
                <p className="text-md">
                    <span className="font-semibold text-gray-700">Họ tên:</span>{" "}
                    <span className="text-gray-900">{user.ho_ten || "Không xác định"}</span>
                </p>
                <p className="text-md">
                    <span className="font-semibold text-gray-700">Username:</span>{" "}
                    <span className="text-gray-900">{user.username || "unknown"}</span>
                </p>
            </div>
        </div>
    )
}

export default UserInfo