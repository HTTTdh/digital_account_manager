import { History, LogIn, CheckCircle, AlertTriangle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "login",
    title: "Đăng nhập hệ thống",
    target: "Admin Dashboard",
    description: "Đăng nhập thành công từ IP 192.168.1.100",
    user: "Nguyễn Văn Admin",
    role: "Admin",
    time: "08:48:47 15/8/2025",
  },
  {
    id: 2,
    type: "approve",
    title: "Phê duyệt yêu cầu",
    target: "ChatGPT Team Plan cho Development",
    description: "Cấp quyền truy cập cho 2 developers với login info đầy đủ",
    user: "Nguyễn Văn Admin",
    role: "Admin",
    time: "08:38:47 15/8/2025",
  },
  {
    id: 3,
    type: "warning",
    title: "Cảnh báo hết hạn",
    target: "Domain bachnabook.vn - ĐÃ HẾT HẠN 5 NGÀY",
    description: "Domain đã hết hạn, cần gia hạn ngay lập tức",
    user: "Nguyễn Văn Admin",
    role: "Admin",
    time: "08:23:47 15/8/2025",
  },
];

const typeConfig = {
  login: { icon: <LogIn className="w-5 h-5" />, color: "bg-blue-500" },
  approve: {
    icon: <CheckCircle className="w-5 h-5" />,
    color: "bg-yellow-500",
  },
  warning: { icon: <AlertTriangle className="w-5 h-5" />, color: "bg-red-500" },
};

export default function ActivityHistory() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-t-4 border-purple-500 p-4 flex items-center space-x-2 mb-6">
        <History className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl font-bold">Lịch Sử Hoạt Động</h1>
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {activities.map((act) => (
          <div key={act.id} className="relative mb-6 flex items-start">
            {/* Icon */}
            <div
              className={`absolute left-0 flex items-center justify-center w-6 h-6 rounded-full text-white ${
                typeConfig[act.type].color
              }`}
            >
              {typeConfig[act.type].icon}
            </div>

            {/* Card */}
            <div className="bg-white rounded-lg shadow p-4 w-full">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{act.title}</div>
                  <p>
                    <span className="font-semibold">Đối tượng:</span>{" "}
                    {act.target}
                  </p>
                  <p className="text-gray-600">{act.description}</p>
                  <div className="flex space-x-2 mt-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {act.user}
                    </span>
                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
                      {act.role}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 text-sm">{act.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
