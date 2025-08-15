import { Bell, AlertTriangle, Clock, Info, Edit3 } from "lucide-react";

const stats = [
  {
    id: 1,
    label: "Đã Hết Hạn",
    value: 3,
    icon: <AlertTriangle />,
    color: "text-red-500",
    border: "border-red-500",
  },
  {
    id: 2,
    label: "Hết Hạn ≤ 7 Ngày",
    value: 2,
    icon: <Clock />,
    color: "text-yellow-500",
    border: "border-yellow-500",
  },
  {
    id: 3,
    label: "Hết Hạn ≤ 30 Ngày",
    value: 1,
    icon: <Info />,
    color: "text-sky-500",
    border: "border-sky-500",
  },
];

const assets = [
  {
    name: "tmedu.vn",
    expiry: "14/9/2025",
    remain: "Còn undefined ngày",
    level: "Cảnh báo",
  },
  {
    name: "thanhmaihsk.edu.vn",
    expiry: "22/8/2025",
    remain: "Còn undefined ngày",
    level: "Khẩn cấp",
  },
  {
    name: "Hosting VPS Premium",
    expiry: "2/9/2025",
    remain: "Còn undefined ngày",
    level: "Khẩn cấp",
  },
  {
    name: "Adobe Creative Suite Team",
    expiry: "Không có",
    remain: "Còn undefined ngày",
    level: "Cảnh báo",
  },
  {
    name: "tmedu.com",
    expiry: "18/8/2025",
    remain: "Còn 3 ngày",
    level: "Cảnh báo",
  },
];

const levelStyles = {
  "Cảnh báo": "bg-yellow-400 text-white",
  "Khẩn cấp": "bg-red-500 text-white",
};

export default function ExpiryNotification() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-t-4 border-purple-500 p-4 flex items-center space-x-2 mb-6">
        <Bell className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl font-bold">Thông Báo Hết Hạn</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.id}
            className={`bg-white rounded-lg shadow p-4 border-l-4 ${s.border} flex items-center`}
          >
            <div className={`text-3xl mr-4 ${s.color}`}>{s.icon}</div>
            <div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-gray-600">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-left">
              <th className="py-3 px-4">TÀI SẢN</th>
              <th className="py-3 px-4">NGÀY HẾT HẠN</th>
              <th className="py-3 px-4">THỜI GIAN CÒN LẠI</th>
              <th className="py-3 px-4">MỨC ĐỘ</th>
              <th className="py-3 px-4">THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a, idx) => (
              <tr
                key={idx}
                className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="py-3 px-4 font-semibold text-blue-800">
                  {a.name}
                </td>
                <td className="py-3 px-4">{a.expiry}</td>
                <td className="py-3 px-4 text-sky-500">{a.remain}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded text-xs ${
                      levelStyles[a.level]
                    }`}
                  >
                    {a.level}
                  </span>
                </td>
                <td className="py-3 px-4 flex space-x-2">
                  <button className="px-3 py-1 rounded bg-gradient-to-r from-pink-400 to-yellow-400 text-white flex items-center space-x-1">
                    <Edit3 className="w-4 h-4" /> <span>Cập Nhật</span>
                  </button>
                  <button className="px-3 py-1 rounded bg-gradient-to-r from-sky-400 to-sky-600 text-white flex items-center space-x-1">
                    <Bell className="w-4 h-4" /> <span>Thông Báo</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
