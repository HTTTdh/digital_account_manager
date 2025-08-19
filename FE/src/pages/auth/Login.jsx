import { useState } from "react";
import { AuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const Auth = AuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Auth.login({ username, password });
    console.log(response);
    if (response.success === true) {
      toast.success("Đăng nhập thành công");
      if (response.user.cap === 1) {
        navigate("/dashboard");
      } else if (response.user.cap === 2) {
        navigate("/dashboard_manager");
      } else if (response.user.cap === 3) {
        navigate("/");
      } else {
        navigate("/");
      }
    } else {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Đăng nhập</h2>

        <input
          type="string"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
