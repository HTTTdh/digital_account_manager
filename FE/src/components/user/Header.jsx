import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatarDefault from "../../assets/avatar_Defaute.webp";
import { Bell, User, LogOut } from "lucide-react";
import { NotificationStore } from "../../stores/notification";
import { formatDateTime } from "../../../src/utils/formatDate";
import { useAuth } from "@/context/AuthContext";

function Header() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();
    const { user, handleLogout } = useAuth();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [userNotification, setUserNotification] = useState([]);
    const notification = NotificationStore();

    const logout = async () => {
        try {
            await handleLogout();
            navigate("/login");
        } catch (err) {
            console.error("Logout thất bại:", err);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const userNotification = await notification.getNotificationByUser();
            setUserNotification(userNotification);
        };
        fetchData();
    }, []);

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow relative">
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    MyApp
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

                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100"
                            >
                                <img
                                    src={avatarDefault}
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