import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleRedirectByRole = (role) => {
    switch (role) {
      case 0: // Root
        navigate("/root/dashboard");
        break;
      case 1: // Admin
        navigate("/dashboard");
        break;
      case 2: // Manager
        navigate("/dashboard_manager");
        break;
      case 3: // User
        navigate("/");
        break;
      default:
        navigate("/login");
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials);
      const role = data.user.cap;
      alert("Đăng nhập thành công 🎉");
      handleRedirectByRole(role);
    } catch (err) {
      alert("Sai tài khoản hoặc mật khẩu ❌");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 flex flex-col space-y-4 transform transition-all hover:scale-[1.01]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Đăng nhập
        </h2>

        <input
          id="username"
          type="text"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          placeholder="Tên đăng nhập"
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          id="password"
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          placeholder="Mật khẩu"
          required
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition-all 
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
