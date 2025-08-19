import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { getLocalStorage } from "../../../utils/localStorage";

export default function PrivateLayout({ children }) {
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.cap !== 1) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.cap !== 1) return null;

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}
