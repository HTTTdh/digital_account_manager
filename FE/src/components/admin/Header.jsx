import { Bell, LogOut, User } from "lucide-react";
import { useState } from "react";
import avatarDefaute from "../../assets/avatar_Defaute.webp"
// import { useAuth } from "../../stores/useAuth";
import { useAuth } from "@/context/AuthContext";

export function Header() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, handleLogout } = useAuth();
    const logout = async () => {
        try {
            await handleLogout();
            navigate("/login");
        } catch (err) {
            console.error("Logout thất bại:", err);
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-end">
                {/* Right side */}
                <div className="flex items-center space-x-4">
                    {/* User menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100"
                        >
                            <img
                                src={avatarDefaute}
                                alt="avatarDefaute"
                                className="h-8 w-8 rounded-full"
                            />

                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.ho_ten}
                                </p>
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
                        </button>

                        {/* Dropdown menu */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                <div className="py-1">
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
