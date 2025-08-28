import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Đang tải...</div>;

  if (!user) return <Navigate to="/login" />;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const userRole = Number(user.cap);

  if (!roles.includes(userRole)) return <Navigate to="/login" />;

  return children;
};
