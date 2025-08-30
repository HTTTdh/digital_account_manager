import Login from "../src/pages/auth/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./context/ProtectedRoute.jsx";
import RootLayout from "../src/components/root/RootLayout"
// Employee
import EmployeeLayout from "../src/components/user/EmployeeLayout";
import Home from "./pages/employee/Home";
import UserGuide from "./pages/admin/UserGuide";
// Manager
import ManagerLayout from "../src/components/manager/ManagerLayout";
import DashboardManager from "./pages/manager/DashboardManager";
import MyAsset from "../src/pages/manager/MyAsset";
import RequestAsset from "../src/pages/manager/RequestAsset";
import AssignAsset from "../src/pages/manager/AssignAsset";

// Admin
import AdminLayout from "../src/components/admin/AdminLayout"
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import AssetManager from "../src/pages/admin/AssetManager";
import UserManager from "../src/pages/admin/QuanLyTaiKhoan/TaiKhoan";
import BrandManager from "../src/pages/admin/BrandManagement";
import ApproveRequest from "../src/pages/admin/ApproveRequests";
import ActivityHistory from "../src/pages/admin/ActivityHistory";
import ExpiryNotification from "../src/pages/admin/ExpiryNotification";
import ReportStats from "../src/pages/admin/ReportStats";
import PersonalLog from "../src/pages/admin/PersonalLog";
import AssetLoginInfo from "../src/pages/admin/AssetLoginInfo";
import DepartmentManager from "./pages/admin/DepartmentManager";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/user-guide"
        element={
          <ProtectedRoute allowedRoles={1}>
            <RootLayout>
              <UserGuide />
            </RootLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/root/dashboard"
        element={
          <ProtectedRoute allowedRoles={0}>
            <RootLayout>
              <DashboardAdmin />
            </RootLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <DashboardAdmin />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/quan-ly-tai-san"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <AssetManager />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/quan-ly-nguoi-dung"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <UserManager />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/quan-ly-thuong-hieu"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <BrandManager />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/quan-ly-phong-ban"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <DepartmentManager />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/phe-duyet-yeu-cau"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <ApproveRequest />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/lich-su-hoat-dong"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <ActivityHistory />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/thong-bao-het-han"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <ExpiryNotification />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/cap-tai-san-truc-tiep"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <ReportStats />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/nhat-ky-ca-nhan"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <PersonalLog />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/thong-tin-dang-nhap-tai-san"
        element={
          <ProtectedRoute allowedRoles={1}>
            <AdminLayout>
              <AssetLoginInfo />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard_manager"
        element={
          <ProtectedRoute allowedRoles={2}>
            <ManagerLayout>
              <DashboardManager />
            </ManagerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/request-asset"
        element={
          <ProtectedRoute allowedRoles={2}>
            <ManagerLayout>
              <RequestAsset />
            </ManagerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/asset-manager"
        element={
          <ProtectedRoute allowedRoles={2}>
            <ManagerLayout>
              <MyAsset />
            </ManagerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/assign-asset"
        element={
          <ProtectedRoute allowedRoles={2}>
            <ManagerLayout>
              <AssignAsset />
            </ManagerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={3}>
            <EmployeeLayout>
              <Home />
            </EmployeeLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
