import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "../employee/Header";
import Footer from "../../Footer";

import { getLocalStorage } from "../../../utils/localStorage";

function EmployeeLayout() {
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user && user.cap == 1) {
      navigate("/dashboard");
    }
    if (user && user.cap == 2) {
      navigate("/dashboard_manager");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default EmployeeLayout;
