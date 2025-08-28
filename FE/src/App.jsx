import Login from "../src/pages/auth/Login";
import { AuthProvider } from "../src/context/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./context/ProtectedRoute.jsx";

// Employee
import EmployeeLayout from "./templates/layouts/employee/EmployeeLayout";
import Home from "./pages/employee/Home";

// Manager
import ManagerLayout from "./templates/layouts/manager/ManagerLayout";
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
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

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
    // <Routes>
    //   <Route path={PATH.LOGIN} element={<Login />} />

    //   {/* Employee */}
    //   <Route element={<EmployeeLayout />}>
    //     <Route path={PATH.HOME} element={<Home />} />
    //   </Route>

    //   {/* Manager Layout */}
    //   <Route element={<ManagerLayout />}>
    //     <Route path={PATH.DASHBOARD_MANAGER} element={<DashboardManager />} />
    //     <Route path={PATH.REQUEST_ASSET} element={<RequestAsset />} />
    //     <Route path={PATH.MY_ASSETS_MANAGER} element={<MyAsset />} />
    //     <Route path={PATH.ASSIGN_ASSET} element={<AssignAsset />} />
    //   </Route>

    //   {/* Admin */}
    //   <Route
    //     path={PATH.DASHBOARD_ADMIN}
    //     element={
    //       <AdminLayout>
    //         <DashboardAdmin />
    //       </AdminLayout>
    //     }
    //   />
    //   <Route
    //     path={PATH.ASSET_MANAGER}
    //     element={
    //       <AdminLayout>
    //         <AssetManager />
    //       </AdminLayout>
    //     }
    //   />
    //   <Route
    //     path={PATH.USER_MANAGER}
    //     element={
    //       <AdminLayout>
    //         <UserManager />
    //       </AdminLayout>
    //     }
    //   />
    //   <Route
    //     path={PATH.BRAND_MANAGER}
    //     element={
    //       <AdminLayout>
    //         <BrandManager />
    //       </AdminLayout>
    //     }
    //   />
    //   <Route
    //     path={PATH.ACTIVITY_HISTORY}
    //     element={
    //       <AdminLayout>
    //         <ActivityHistory />
    //       </AdminLayout>
    //     }
    //   />
    //   <Route
    //     path={PATH.APPROVE_REQUEST}
    //     element={
    //       <AdminLayout>
    //         <ApproveRequest />
    //       </AdminLayout>
    //     }
    //   />
    //   <Route
    //     path={PATH.EXPIRY_NOTIFICATION}
    //     element={
    //       <AdminLayout>
    //         <ExpiryNotification />
    //       </AdminLayout>
    //     }
    //   />
    //   <Route
    //     path={PATH.REPORT_STATS}
    //     element={
    //       <AdminLayout>
    //         <ReportStats />
    //       </AdminLayout>
    //     }
    //   />
    //   <Route
    //     path={PATH.PERSONAL_LOG}
    //     element={
    //       <AdminLayout>
    //         <PersonalLog />
    //       </AdminLayout>
    //     }
    //   />
    //   <Route
    //     path={PATH.ASSET_LOGIN_INFO}
    //     element={
    //       <AdminLayout>
    //         <AssetLoginInfo />
    //       </AdminLayout>
    //     }
    //   />
    // </Routes>
  );
}

export default App;
