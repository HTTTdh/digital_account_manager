import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "../manager/Header";
import { getLocalStorage } from "../../../utils/localStorage";

function ManagerLayout() {
  const navigate = useNavigate();
  const user = getLocalStorage("user");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.cap !== 2) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.cap !== 2) return null;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default ManagerLayout;
