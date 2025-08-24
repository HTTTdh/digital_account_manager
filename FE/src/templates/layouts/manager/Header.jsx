import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";
import avatarDefault from "../../../assets/avatar_Defaute.webp";

function Header() {
  const navigate = useNavigate();
  const user = getLocalStorage("user");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    clearLocalStorage("user");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow relative">
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

      <div className="relative">
        {user ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-col leading-tight">
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
          </div>
        ) : (
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Đăng nhập
          </Link>
        )}

        {isOpen && user && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
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
    </header>
  );
}

export default Header;
