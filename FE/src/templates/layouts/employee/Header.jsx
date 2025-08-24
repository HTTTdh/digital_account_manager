import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";
import avatarDefault from "../../../assets/avatar_Defaute.webp";
import { Bell } from "lucide-react";

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
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyApp
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
              <span className="text-xs text-gray-500 text-center">
                {user.cap === 1
                  ? "Quản trị viên"
                  : user.cap === 2
                  ? "Quản lý"
                  : user.cap === 3
                  ? "Nhân viên"
                  : "Người dùng"}
              </span>
            </div>
            <button
              type="button"
              className="relative p-1 rounded-full hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                alert("Thông báo sẽ hiện ở đây!");
              }}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
                3
              </span>
            </button>
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
            <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
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
