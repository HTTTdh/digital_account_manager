import { Route, Routes, Navigate } from "react-router-dom";
import { PATH } from "../src/utils/path";
import Layout from "./templates/Layout";
import Home from "./pages/employee/Home";
import Login from "../src/pages/auth/Login";
import Alerts from "../src/pages/employee/Alerts";
import RequestAsset from "../src/pages/manager/RequestAsset";
import DashboardManager from "./pages/manager/DashboardManager";
import ManagerAssetList from "./pages/manager/ManagerAssetList";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

import PrivateLayout from "../src/templates/privateRoute";

import AssetManager from "../src/pages/admin/AssetManager";

//thay
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
      {/* Khi mở app ở "/", tự động chuyển sang "/login" */}
      {/* <Route path="/" element={<Navigate to={PATH.LOGIN} replace />} /> */}

      {/* Login */}
      {/* <Route path={PATH.LOGIN} element={<Login />} /> */}

      {/* Public routes - dùng Layout */}
      <Route element={<Layout />}>
        {/* Employee */}
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.REQUEST_ASSET} element={<RequestAsset />} />
        <Route path={PATH.ALERTS} element={<Alerts />} />

        {/* Manager */}
        <Route path={PATH.DASHBOARD_MANAGER} element={<DashboardManager />} />
        <Route path={PATH.MANAGER_ASSET_LIST} element={<ManagerAssetList />} />
      </Route>

      {/* Private routes - dùng PrivateLayout */}
      <Route
        path={PATH.DASHBOARD_ADMIN}
        element={
          <PrivateLayout>
            <DashboardAdmin />
          </PrivateLayout>
        }
      />

      <Route
        path={PATH.ASSET_MANAGER}
        element={
          <PrivateLayout>
            <AssetManager />
          </PrivateLayout>
        }
      />

      <Route
        path={PATH.USER_MANAGER}
        element={
          <PrivateLayout>
            <UserManager />
          </PrivateLayout>
        }
      />

      <Route
        path={PATH.BRAND_MANAGER}
        element={
          <PrivateLayout>
            <BrandManager />
          </PrivateLayout>
        }
      />

      <Route
        path={PATH.ACTIVITY_HISTORY}
        element={
          <PrivateLayout>
            <ActivityHistory />
          </PrivateLayout>
        }
      />
      <Route
        path={PATH.APPROVE_REQUEST}
        element={
          <PrivateLayout>
            <ApproveRequest />
          </PrivateLayout>
        }
      />

      <Route
        path={PATH.EXPIRY_NOTIFICATION}
        element={
          <PrivateLayout>
            <ExpiryNotification />
          </PrivateLayout>
        }
      />
      <Route
        path={PATH.REPORT_STATS}
        element={
          <PrivateLayout>
            <ReportStats />
          </PrivateLayout>
        }
      />
      <Route
        path={PATH.PERSONAL_LOG}
        element={
          <PrivateLayout>
            <PersonalLog />
          </PrivateLayout>
        }
      />
    </Routes>
  );
}

export default App;
