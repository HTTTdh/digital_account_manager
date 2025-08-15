import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  Building,
  ClipboardCheck,
  RotateCcw,
  Bell,
  BarChart,
  BookUser,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  {
    label: "Quản Lý Tài Sản",
    icon: Package,
    href: "/dashboard/quan-ly-tai-san",
  },
  {
    label: "Quản Lý Người Dùng",
    icon: Users,
    href: "/dashboard/quan-ly-nguoi-dung",
  },
  {
    label: "Quản Lý Thương Hiệu",
    icon: Building,
    href: "/dashboard/quan-ly-thuong-hieu",
  },
  {
    label: "Phê Duyệt Yêu Cầu",
    icon: ClipboardCheck,
    href: "/dashboard/phe-duyet-yeu-cau",
  },
  {
    label: "Lịch Sử Hoạt Động",
    icon: RotateCcw,
    href: "/dashboard/lich-su-hoat-dong",
  },
  {
    label: "Thông Báo Hết Hạn",
    icon: Bell,
    href: "/dashboard/thong-bao-het-han",
  },
  {
    label: "Báo Cáo & Thống Kê",
    icon: BarChart,
    href: "/dashboard/bao-cao-thong-ke",
  },
  {
    label: "Nhật Ký Cá Nhân",
    icon: BookUser,
    href: "/dashboard/nhat-ky-ca-nhan",
  },
];

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="bg-[#243647] text-white w-64 min-h-screen">
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        Menu Quản Trị
      </div>
      <nav className="mt-2">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;

          return (
            <a key={idx} href={item.href}>
              <button
                className={`flex items-center w-full text-left px-4 py-3 transition ${
                  isActive ? "bg-blue-500" : "hover:bg-blue-600"
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
