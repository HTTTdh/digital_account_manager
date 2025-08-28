{% comment %} import { useEffect } from "react"; {% endcomment %}
{% comment %} import { useNavigate } from "react-router-dom"; {% endcomment %}
{% comment %} import { Sidebar } from "./Sidebar";
import { Header } from "./Header"; {% endcomment %}
{% comment %} import { getLocalStorage } from "../../../utils/localStorage"; {% endcomment %}

{% comment %} export default function AdminLayout({ children }) { {% endcomment %}
  {% comment %} const navigate = useNavigate();
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

  if (!user || user.cap !== 1) return null; {% endcomment %}
{% comment %} 
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
} {% endcomment %}
