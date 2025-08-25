import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";
import avatarDefault from "../../../assets/avatar_Defaute.webp";
import { Bell } from "lucide-react";
import { NotificationStore } from "../../../stores/notification";
import { formatDateTime } from "../../../utils/formatDate";

function Header() {
  const navigate = useNavigate();
  const user = getLocalStorage("user");
  const [isOpen, setIsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [userNotification, setUserNotification] = useState([]);
  const notification = NotificationStore();

  useEffect(() => {
    const fetchData = async () => {
      const userNotification = await notification.getNotificationByUser();
      setUserNotification(userNotification);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    clearLocalStorage("user");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow relative">
      {/* Left nav */}
      <div className="flex items-center space-x-6">
        <Link
          to="/dashboard_manager"
          className="text-2xl font-bold text-blue-600"
        >
          MyApp
        </Link>
        <Link
          to="/dashboard_manager"
          className="text-gray-700 hover:text-blue-600"
        >
          Trang chủ
        </Link>
        <Link to="/request-asset" className="text-gray-700 hover:text-blue-600">
          Yêu cầu cấp tài sản
        </Link>
        <Link to="/asset-manager" className="text-gray-700 hover:text-blue-600">
          Tài sản của tôi
        </Link>
        <Link to="/assign-asset" className="text-gray-700 hover:text-blue-600">
          Cấp tài sản cho nhân viên
        </Link>
      </div>

      <div className="relative flex items-center gap-3">
        {user ? (
          <>
            <div className="relative">
              <button
                type="button"
                className="relative p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
                  {userNotification?.length || 0}
                </span>
              </button>

              {isNotifOpen && (
                <div className="absolute right-[-32px] mt-2 w-72 bg-white border rounded shadow-lg z-50">
                  <div className="p-2 font-semibold border-b">Thông báo</div>
                  <ul className="max-h-60 overflow-y-auto">
                    {userNotification.length > 0 ? (
                      userNotification.map((notif, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                        >
                          {notif?.noi_dung || "Nội dung thông báo"} |{" "}
                          {formatDateTime(notif?.thoi_gian)}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-sm text-gray-500">
                        Không có thông báo
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex flex-col leading-tight text-right">
                <span className="font-medium">{user?.ho_ten}</span>
                <span className="text-xs text-gray-500">
                  {user.cap === 1
                    ? "Quản trị viên"
                    : user.cap === 2
                    ? "Quản lý"
                    : user.cap === 3
                    ? "Nhân viên"
                    : "Người dùng"}
                </span>
              </div>
              <img
                src={avatarDefault}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <svg
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>

              {isOpen && (
                <div className="absolute right-0 top-10 w-48 bg-white border rounded shadow-lg">
                  <Link
                    to="/dashboard_manager"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Thông tin cá nhân
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;