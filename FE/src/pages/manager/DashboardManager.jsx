import { useEffect, useState } from "react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { PackageOpen, X } from "lucide-react";
import { UserStore } from "../../stores/tai_khoan";
import { useAuth } from "@/context/AuthContext";

function AssetDetailModal({ asset, onClose }) {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="bg-white rounded-2xl p-6 w-1/2 shadow-lg relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Chi tiết tài sản</h2>
        <div className="space-y-2">
          <p><strong>Mã tài sản:</strong> {asset.id}</p>
          <p><strong>Tên tài sản:</strong> {asset.ten_tai_san}</p>
          <p><strong>Người nhận:</strong> {asset.ho_ten_nguoi_nhan}</p>
          <p><strong>Ngày cấp:</strong> {asset.ngay_cap}</p>
          <p><strong>Ngày thu hồi:</strong> {asset.ngay_thu_hoi || "Chưa thu hồi"}</p>
          <p><strong>Nhà cung cấp:</strong> {asset.ten_nha_cung_cap}</p>
          <p><strong>Phòng ban:</strong> {asset.ten_phong_ban}</p>
          <p><strong>Số ngày còn lại:</strong> {asset.so_ngay_con_lai}</p>
        </div>
      </div>
    </div>
  );
}

// ===================== User Detail Modal =====================
function UserDetailModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="bg-white rounded-2xl p-6 w-1/2 shadow-lg relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Chi tiết nhân viên</h2>
        <div className="space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Tên nhân viên:</strong> {user.ho_ten}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Số điện thoại:</strong> {user.so_dien_thoai}</p>
          <p><strong>Chức vụ:</strong> {user.chuc_vu}</p>
          <p><strong>Phòng ban:</strong> {user.ten_phong_ban}</p>
        </div>
      </div>
    </div>
  );
}

// ===================== Dashboard Manager =====================
function DashboardManager() {
  const assetLoginInfo = AssetLoginInfoStore();
  const userStore = UserStore();
  const user = useAuth();

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const assets = assetLoginInfo?.dataPrivate?.value ?? [];
  const employees = userStore.dataLevel2;

  // Load data tài sản
  useEffect(() => {
    userStore.findforLevel2();
    assetLoginInfo.getAssetLoginInfoPrivate();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedAsset(null);
        setSelectedUser(null);
      }
    };
    window.addEventListener("keydown", handleEsc);

    if (selectedAsset || selectedUser) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [selectedAsset, selectedUser]);

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* Khối Tài sản */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <PackageOpen className="text-blue-500" /> Tài sản được cấp
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Tổng số: {assets.length}
        </p>
        <ul className="space-y-2 overflow-y-auto h-[300px]">
          {assets.map((asset) => (
            <li
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              {asset.ten_tai_san} - {asset.ho_ten_nguoi_nhan}
            </li>
          ))}
        </ul>
      </div>

      {/* Khối Nhân viên */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Danh sách nhân viên</h2>
        <p className="text-sm text-gray-500 mb-4">
          Tổng số: {employees.length}
        </p>
        <ul className="space-y-2 overflow-y-auto h-[300px]">
          {employees.map((emp) => (
            <li
              key={emp.id}
              onClick={() => setSelectedUser(emp)}
              className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              {emp.ho_ten}
            </li>
          ))}
        </ul>
      </div>

      {/* Modals */}
      <AssetDetailModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
      <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}

export default DashboardManager;
