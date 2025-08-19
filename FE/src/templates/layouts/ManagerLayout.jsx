import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../Footer";
import { getLocalStorage } from "../../utils/localStorage";

function ManagerLayout() {
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  useEffect(() => {
    if (!user) {
      // Chưa đăng nhập
      navigate("/login");
    } else if (user.cap !== 2) {
      // Đã đăng nhập nhưng không phải manager
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.cap !== 2) return null; // chặn render khi chưa hợp lệ

  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default ManagerLayout;
