import { Clock, User } from "lucide-react";

const logs = [
  {
    title: "Đăng nhập hệ thống",
    desc: "Admin Dashboard\nĐăng nhập thành công từ IP 192.168.1.100",
    time: "08:48:47 15/8/2025",
  },
  {
    title: "Phê duyệt yêu cầu",
    desc: "ChatGPT Team Plan cho Development\nCấp quyền truy cập cho 2 developers với login info đầy đủ",
    time: "08:38:47 15/8/2025",
  },
  {
    title: "Cảnh báo hết hạn",
    desc: "Domain bacnhabook.vn - ĐÃ HẾT HẠN 5 NGÀY\nDomain đã hết hạn, cần gia hạn ngay lập tức",
    time: "08:23:47 15/8/2025",
  },
];

export default function PersonalLog() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-xl p-4 flex items-center space-x-3">
        <User className="w-6 h-6" />
        <h1 className="text-lg font-semibold">Nhật Ký Cá Nhân</h1>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-blue-400 bg-gray-50 rounded-b-xl p-6 space-y-6">
        {logs.map((log, i) => (
          <div key={i} className="relative pl-8">
            {/* Timeline Icon */}
            <div className="absolute -left-4 top-2 flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full text-white text-xs">
              <span>+</span>
            </div>

            {/* Card */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-800">{log.title}</h2>
              <p className="text-gray-600 text-sm whitespace-pre-line mt-1">
                {log.desc}
              </p>
              <div className="flex items-center text-gray-500 text-xs mt-3">
                <Clock className="w-4 h-4 mr-1" />
                {log.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
