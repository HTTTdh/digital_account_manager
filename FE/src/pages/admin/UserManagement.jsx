import { useState } from "react";
import { Eye, Edit, Ban, KeyRound } from "lucide-react";

export default function UserManagement() {
  const [selectedRole, setSelectedRole] = useState("Tất Cả Vai Trò");
  const [selectedDept, setSelectedDept] = useState("Tất Cả Bộ Phận");
  const [selectedStatus, setSelectedStatus] = useState("Tất Cả Trạng Thái");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <select
          className="border rounded p-2"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input
          className="border rounded p-2"
          placeholder="Tên, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bảng */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <th className="p-3 text-left">NGƯỜI DÙNG</th>
            <th className="p-3">VAI TRÒ</th>
            <th className="p-3">BỘ PHẬN</th>
            <th className="p-3">EMAIL</th>
            <th className="p-3">NGÀY THAM GIA</th>
            <th className="p-3">TRẠNG THÁI</th>
            <th className="p-3">TÀI SẢN</th>
            <th className="p-3">THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-b">
              {/* Người dùng */}
              <td className="p-3 flex items-center space-x-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <span className="text-blue-600 font-bold">👤</span>
                </div>
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-gray-500 text-sm">{user.username}</div>
                </div>
              </td>
              {/* Vai trò */}
              <td className="p-3">
                <span
                  className={`text-white px-3 py-1 rounded ${user.roleColor}`}
                >
                  {user.role}
                </span>
              </td>
              {/* Bộ phận */}
              <td className="p-3">
                <span
                  className={`text-white px-3 py-1 rounded ${user.deptColor}`}
                >
                  {user.department}
                </span>
              </td>
              {/* Email */}
              <td className="p-3">
                <div className="text-blue-500">{user.email}</div>
                <div className="text-sm">{user.phone}</div>
              </td>
              {/* Ngày tham gia */}
              <td className="p-3">
                <div>{user.joinDate}</div>
                <div className="text-sm text-gray-500">{user.days}</div>
              </td>
              {/* Trạng thái */}
              <td className="p-3">
                <span
                  className={`text-white px-3 py-1 rounded ${user.statusColor}`}
                >
                  {user.status}
                </span>
              </td>
              {/* Tài sản */}
              <td className="p-3 text-center">
                <span className="bg-cyan-500 text-white px-2 py-1 rounded-full">
                  {user.assets}
                </span>
              </td>
              {/* Thao tác */}
              <td className="p-3 flex space-x-2">
                <button className="p-2 border rounded hover:bg-gray-100">
                  <Eye className="w-4 h-4 text-blue-500" />
                </button>
                <button className="p-2 border rounded hover:bg-gray-100">
                  <Edit className="w-4 h-4 text-yellow-500" />
                </button>
                <button className="p-2 border rounded hover:bg-gray-100">
                  <Ban className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 border rounded hover:bg-gray-100">
                  <KeyRound className="w-4 h-4 text-cyan-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
