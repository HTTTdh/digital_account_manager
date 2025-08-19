import { Route, Routes, Navigate } from "react-router-dom";
import { PATH } from "../src/utils/path";
import EmployeeLayout from "./templates/layouts/EmployeeLayout";
import ManagerLayout from "./templates/layouts/ManagerLayout";
import Home from "./pages/employee/Home";
import Login from "../src/pages/auth/Login";
import Alerts from "../src/pages/employee/Alerts";
import RequestAsset from "../src/pages/manager/RequestAsset";
import DashboardManager from "./pages/manager/DashboardManager";
import ManagerAssetList from "./pages/manager/ManagerAssetList";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

import AdminLayout from "./templates/layouts/AdminLayout";

import AssetManager from "../src/pages/admin/AssetManager";
import UserManager from "../src/pages/admin/UserManagement";
import BrandManager from "../src/pages/admin/BrandManagement";
import ApproveRequest from "../src/pages/admin/ApproveRequests";
import ActivityHistory from "../src/pages/admin/ActivityHistory";
import ExpiryNotification from "../src/pages/admin/ExpiryNotification";
import ReportStats from "../src/pages/admin/ReportStats";
import PersonalLog from "../src/pages/admin/PersonalLog";

function App() {
  return (
    <Routes>
      {/* Khi mở app ở "/", tự động chuyển sang "/login" */}
      {/* <Route path="/" element={<Navigate to={PATH.LOGIN} replace />} /> */}

      {/* Login */}
      <Route path={PATH.LOGIN} element={<Login />} />

      {/* Public routes - dùng Layout */}
      <Route element={<EmployeeLayout />}>
        {/* Employee */}
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.REQUEST_ASSET} element={<RequestAsset />} />
        <Route path={PATH.ALERTS} element={<Alerts />} />
      </Route>

      {/* Manager */}
      <Route element={<ManagerLayout />}>
        <Route path={PATH.DASHBOARD_MANAGER} element={<DashboardManager />} />
        <Route path={PATH.MANAGER_ASSET_LIST} element={<ManagerAssetList />} />
      </Route>
      {/* Private routes - dùng AdminLayout */}
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
    </Routes>
  );
}

export default App;
