import { Route, Routes } from "react-router-dom";
import { PATH } from "../src/utils/path";
import Layout from "./templates/Layout";
import Home from "./pages/employee/Home";
import Login from "../src/pages/auth/Login";
import Alerts from "../src/pages/employee/Alerts";
import RequestAsset from "../src/pages/manager/RequestAsset";
import DashboardManager from "./pages/manager/DashboardManager";
import DashboardAdmin from "./pages/admin/DashboardAdmin";

function App() {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<Layout />}>
        <Route index element={<Login />} />

        {/* Employee */}
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.REQUEST_ASSET} element={<RequestAsset />} />
        <Route path={PATH.ALERTS} element={<Alerts />} />

        {/* Manager */}
        <Route path={PATH.DASHBOARD_MANAGER} element={<DashboardManager />} />

        {/* Admin */}
        <Route path={PATH.DASHBOARD_ADMIN} element={<DashboardAdmin />} />
      </Route>
      <Route path={PATH.LOGIN} element={<Login />} />
    </Routes>
  );
}

export default App;
