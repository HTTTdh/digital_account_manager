import { Bell, Search, LogOut, User } from "lucide-react";
import { useState } from "react";
import avatarDefaute from "../../assets/avatar_Defaute.webp";

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Dữ liệu user mẫu để test
  const [user] = useState({
    ho_ten: "Nguyễn Văn A",
    cap: 1,
    email: "nguyenvana@example.com",
    avatar: avatarDefaute,
  });

  // Hàm logout giả lập
  const logout = () => {
    console.log("User logged out!");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end">
        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md">
            <Bell className="h-5 w-5" />
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.ho_ten}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.ho_ten?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.ho_ten}
                </p>
                <p className="text-xs text-gray-500">Cấp {user?.cap}</p>
              </div>
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      console.log("Đi tới trang thông tin cá nhân");
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Thông tin cá nhân
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
