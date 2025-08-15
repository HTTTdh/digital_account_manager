
import React, { useEffect, useState } from "react";
import {
  Package,
  Users,
  AlertTriangle,
  Clock,
  Hourglass,
  Gift,
  PlusCircle,
} from "lucide-react";

function DashboardAdmin() {
  const [stats, setStats] = useState({
    totalAssets: 39,
    totalUsers: 12,
    expiringSoon: 12,
    pendingRequests: 4,
  });

  const pendingRequests = [
    { id: 1, name: "Figma Professional", requester: "undefined" },
    { id: 2, name: "Microsoft Office 365 Business", requester: "undefined" },
    { id: 3, name: "GitHub Enterprise", requester: "Phạm Văn Newbie" },
    { id: 4, name: "Figma Professional", requester: "Lê Thị Designer Pro" },
  ];

  const recentGrantedAssets = [
    {
      id: 1,
      name: "WhatsApp Business TMEDU",
      givenTo: "Customer Service",
      date: "15/5/2024",
    },
    {
      id: 2,
      name: "API Gateway Service",
      givenTo: "Hoàng Văn Developer",
      date: "1/4/2024",
    },
    {
      id: 3,
      name: "Container Registry - Docker Hub",
      givenTo: "Hoàng Văn Developer",
      date: "15/3/2024",
    },
    {
      id: 4,
      name: "Pinterest TMEDU Inspiration",
      givenTo: "Nguyễn Thị Designer",
      date: "15/3/2024",
    },
  ];

  const recentAddedAssets = [
    { id: 1, name: "WhatsApp Business TMEDU", date: "1/5/2024" },
    { id: 2, name: "Reddit Community r/TMEDU", date: "1/4/2024" },
    { id: 3, name: "API Gateway Service", date: "15/3/2024" },
    { id: 4, name: "Container Registry - Docker Hub", date: "1/3/2024" },
  ];

  const statCards = [
    {
      label: "TỔNG TÀI SẢN",
      value: stats.totalAssets,
      icon: Package,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "TỔNG NGƯỜI DÙNG",
      value: stats.totalUsers,
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "SẮP HẾT HẠN",
      value: stats.expiringSoon,
      icon: AlertTriangle,
      color: "from-yellow-400 to-yellow-500",
    },
    {
      label: "YÊU CẦU CHỜ",
      value: stats.pendingRequests,
      icon: Clock,
      color: "from-pink-400 to-pink-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-5">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`bg-gradient-to-r ${card.color} rounded-xl p-5 flex items-center space-x-4 shadow-md`}
            >
              <div className="bg-white/20 p-3 rounded-full">
                <Icon className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{card.value}</p>
                <p className="text-white text-sm">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Requests */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-t-lg text-white font-semibold flex items-center space-x-2">
            <Hourglass className="w-5 h-5" />
            <span>Yêu cầu đang chờ duyệt</span>
          </div>
          <div className="divide-y">
            {pendingRequests.map((item) => (
              <div key={item.id} className="p-3">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Yêu cầu bởi: {item.requester}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Granted */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-t-lg text-white font-semibold flex items-center space-x-2">
            <Gift className="w-5 h-5" />
            <span>Tài sản cấp gần nhất</span>
          </div>
          <div className="divide-y">
            {recentGrantedAssets.map((item) => (
              <div key={item.id} className="p-3">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Cấp cho: {item.givenTo} - {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Added */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-t-lg text-white font-semibold flex items-center space-x-2">
            <PlusCircle className="w-5 h-5" />
            <span>Tài sản mới thêm gần đây</span>
          </div>
          <div className="divide-y">
            {recentAddedAssets.map((item) => (
              <div key={item.id} className="p-3">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Thêm ngày: {item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
