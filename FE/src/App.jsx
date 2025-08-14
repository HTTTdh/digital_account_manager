// import { Route, Routes } from "react-router-dom";
// import { PATH } from "../src/utils/path";
// import Layout from "./templates/Layout";
// import Home from "./pages/employee/Home";
// import Login from "../src/pages/auth/Login";
// import Alerts from "../src/pages/employee/Alerts";
// import RequestAsset from "../src/pages/manager/RequestAsset";
// import DashboardManager from "./pages/manager/DashboardManager";
// import DashboardAdmin from "./pages/admin/DashboardAdmin";

// function App() {
//   return (
//     <Routes>
//       <Route path={PATH.LOGIN} element={<Layout />}>
//         <Route index element={<Login />} />
//       </Route>

//       {/* Employee */}
//       <Route path={PATH.HOME} element={<Home />} />
//       <Route path={PATH.REQUEST_ASSET} element={<RequestAsset />} />
//       <Route path={PATH.ALERTS} element={<Alerts />} />

//       {/* Manager */}
//       <Route path={PATH.DASHBOARD_MANAGER} element={<DashboardManager />} />

//       {/* Admin */}
//       <Route path={PATH.DASHBOARD_ADMIN} element={<DashboardAdmin />} />
//     </Routes>
//   );
// }

// export default App;

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

function App() {
  return (
    <Routes>
      {/* Khi mở app ở "/", tự động chuyển sang "/login" */}
      <Route path="/" element={<Navigate to={PATH.LOGIN} replace />} />

      {/* Login */}
      <Route path={PATH.LOGIN} element={<Login />} />

      <Route element={<Layout />}>
        {/* Employee */}
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.REQUEST_ASSET} element={<RequestAsset />} />
        <Route path={PATH.ALERTS} element={<Alerts />} />

        {/* Manager */}
        <Route path={PATH.DASHBOARD_MANAGER} element={<DashboardManager />} />
        <Route path={PATH.MANAGER_ASSET_LIST} element={<ManagerAssetList />} />

        {/* Admin */}
        <Route path={PATH.DASHBOARD_ADMIN} element={<DashboardAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
