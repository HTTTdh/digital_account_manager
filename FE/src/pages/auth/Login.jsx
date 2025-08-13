import { useState } from "react";
import { AuthStore } from "../../stores/authStore";

export default function Login() {
  const Auth = AuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Auth.login({ email, password });
    console.log(response);
    if (response.status === 200) {
      if (response.role === 1) {
        navigate("/admin-dashboard");
      } else if (response.role === 2) {
        navigate("/manager-dashboard");
      } else if (response.role === 3) {
        navigate("/staff-dashboard");
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
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
