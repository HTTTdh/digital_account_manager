import { Route, Routes } from "react-router-dom";
import { PATH } from "../src/utils/path";
import Login from "../src/pages/auth/Login";

// Employee
import EmployeeLayout from "./templates/layouts/employee/EmployeeLayout";
import Home from "./pages/employee/Home";
import Alerts from "../src/pages/employee/Alerts";

// Manager
import ManagerLayout from "./templates/layouts/manager/ManagerLayout";
import DashboardManager from "./pages/manager/DashboardManager";
import MyAsset from "../src/pages/manager/MyAsset";
import RequestAsset from "../src/pages/manager/RequestAsset";

// Admin
import AdminLayout from "./templates/layouts/admin/AdminLayout";
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
      {/* Login */}
      <Route path={PATH.LOGIN} element={<Login />} />

      <Route element={<EmployeeLayout />}>
        {/* Employee */}
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.ALERTS} element={<Alerts />} />
      </Route>

      {/* Manager Layout */}
      <Route element={<ManagerLayout />}>
        <Route path={PATH.DASHBOARD_MANAGER} element={<DashboardManager />} />
        <Route path={PATH.REQUEST_ASSET} element={<RequestAsset />} />
        <Route path={PATH.MY_ASSETS_MANAGER} element={<MyAsset />} />
      </Route>

      {/* Admin */}
      <Route
        path={PATH.DASHBOARD_ADMIN}
        element={
          <AdminLayout>
            <DashboardAdmin />
          </AdminLayout>
        }
      />
      <Route
        path={PATH.ASSET_MANAGER}
        element={
          <AdminLayout>
            <AssetManager />
          </AdminLayout>
        }
      />
      <Route
        path={PATH.USER_MANAGER}
        element={
          <AdminLayout>
            <UserManager />
          </AdminLayout>
        }
      />
      <Route
        path={PATH.BRAND_MANAGER}
        element={
          <AdminLayout>
            <BrandManager />
          </AdminLayout>
        }
      />
      <Route
        path={PATH.ACTIVITY_HISTORY}
        element={
          <AdminLayout>
            <ActivityHistory />
          </AdminLayout>
        }
      />
      <Route
        path={PATH.APPROVE_REQUEST}
        element={
          <AdminLayout>
            <ApproveRequest />
          </AdminLayout>
        }
      />
      <Route
        path={PATH.EXPIRY_NOTIFICATION}
        element={
          <AdminLayout>
            <ExpiryNotification />
          </AdminLayout>
        }
      />
      <Route
        path={PATH.REPORT_STATS}
        element={
          <AdminLayout>
            <ReportStats />
          </AdminLayout>
        }
      />
      <Route
        path={PATH.PERSONAL_LOG}
        element={
          <AdminLayout>
            <PersonalLog />
          </AdminLayout>
        }
      />
      <Route
        path={PATH.ASSET_LOGIN_INFO}
        element={
          <AdminLayout>
            <AssetLoginInfo />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default App;
