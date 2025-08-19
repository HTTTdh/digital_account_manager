import { Route, Routes, Navigate } from "react-router-dom";
import { PATH } from "../src/utils/path";
import EmployeeLayout from "./templates/layouts/employee/EmployeeLayout";
import ManagerLayout from "./templates/layouts/manager/ManagerLayout";
import MyAsset from "../src/pages/manager/MyAsset";
import Home from "./pages/employee/Home";
import Login from "../src/pages/auth/Login";
import Alerts from "../src/pages/employee/Alerts";
import DashboardManager from "./pages/manager/DashboardManager";
import ManagerAssetList from "./pages/manager/ManagerAssetList";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

import AdminLayout from "./templates/layouts/admin/AdminLayout";

import AssetManager from "../src/pages/admin/AssetManager";
import RequestAsset from "../src/pages/manager/RequestAsset";

import UserManager from "../src/pages/admin/QuanLyTaiKhoan/TaiKhoan";

//import UserManager from "../src/pages/admin/UserManagement";

import BrandManager from "../src/pages/admin/BrandManagement";
import ApproveRequest from "../src/pages/admin/ApproveRequests";
import ActivityHistory from "../src/pages/admin/ActivityHistory";
import ExpiryNotification from "../src/pages/admin/ExpiryNotification";
import ReportStats from "../src/pages/admin/ReportStats";
import PersonalLog from "../src/pages/admin/PersonalLog";

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
