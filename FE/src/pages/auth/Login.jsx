import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error, user } = useAuth();
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
        navigate("/login"); // fallback
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials);
      const role = data.user.cap;
      console.log("Logged in user:", data.user.cap);
      handleRedirectByRole(role);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Đăng nhập</h2>

        <input
          id="username"
          type="text"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          placeholder="Enter your username"
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          id="password"
          type="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          placeholder="Enter your password"
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? "Logging in..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
