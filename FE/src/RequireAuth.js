import { Navigate } from "react-router-dom";
import { getLocalStorage } from "../src/utils/localStorage";

function RequireAuth({ allowedRoles, children }) {
  const user = getLocalStorage("user");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <div>RequireAuth</div>;
}

export default RequireAuth;
