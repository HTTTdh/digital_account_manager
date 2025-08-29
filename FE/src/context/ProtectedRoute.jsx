import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Đang tải...</div>;
  console.log("User:", user);

  if (!user) return <Navigate to="/login" />;

  const userRole = Number(user.cap);

  if (userRole === 0) return children;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(userRole)) return <Navigate to="/login" />;

  return children;
};

