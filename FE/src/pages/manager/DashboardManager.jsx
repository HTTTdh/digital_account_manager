import { useEffect, useState } from "react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { getLocalStorage } from "../../utils/localStorage";
import { PackageOpen, X } from "lucide-react";
import { AuthStore } from "../../stores/authStore";
import { formatDateTime } from "../../utils/formatDate";

function DashboardManager() {
  const assetLoginInfo = AssetLoginInfoStore();
  const user = getLocalStorage("user");
  const auth = AuthStore();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userInDepartment, setUserInDepartment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user.PhongBanId) {
        await assetLoginInfo.getAssetLoginInfoByDepartment(user.PhongBanId);
      }
      const response = await auth.getAllUser();
      const userInDepartment = response?.filter(
        (item) => item.phong_ban_id === user.PhongBanId
      );
      setUserInDepartment(userInDepartment);
    };
    fetchData();
  }, []);

  const cardBase =
    "flex-1 p-4 rounded-xl shadow-md cursor-pointer transition-transform duration-300 ease-in-out select-none";

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-900">
        Dashboard Tài sản số
      </h2>

      {assetLoginInfo?.data?.value?.length > 0 ||
        userInDepartment?.length > 0 ? (
        <>
          <div className="flex gap-8">
            <div className="w-1/2">
              <div
                onClick={() => setSelectedCategory("assets")}
                className={`${cardBase} ${selectedCategory === "assets"
                  ? "border-4 border-blue-600 bg-blue-100 scale-105"
                  : "border border-gray-300 bg-white hover:scale-105"
                  }`}
                role="button"
                tabIndex={0}
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  Tổng số tài sản số
                </h3>
                <p className="text-4xl font-bold text-blue-900">
                  {assetLoginInfo?.data?.value?.length}
                </p>
              </div>
            </div>
            {/* Card nhân viên */}
            <div className="w-1/2">
              <div
                onClick={() => setSelectedCategory("employees")}
                className={`${cardBase} ${selectedCategory === "employees"
                  ? "border-4 border-green-600 bg-green-100 scale-105"
                  : "border border-gray-300 bg-white hover:scale-105"
                  }`}
                role="button"
                tabIndex={0}
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Tổng nhân viên phòng ban
                </h3>
                <p className="text-4xl font-bold text-green-900">
                  {userInDepartment?.length}
                </p>
              </div>
            </div>
          </div>

          {selectedCategory && (
            <div className="mt-6 p-4 border rounded-xl shadow-lg bg-white max-w-4xl mx-auto">
              {selectedCategory === "assets" && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                    Danh sách tài sản số
                  </h3>
                  <ul className="space-y-2">
                    {assetLoginInfo?.data?.value &&
                      assetLoginInfo?.data?.value?.length > 0 ? (
                      assetLoginInfo?.data?.value?.map((asset, index) => (
                        <li
                          key={index}
                          className="p-3 rounded-lg border hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                          onClick={() => setSelectedAsset(asset)}
                        >
                          {asset?.ten_tai_san} - {asset?.ho_ten_nguoi_nhan}
                        </li>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">
                        Hiện tại phòng ban của bạn chưa có tài sản
                      </p>
                    )}
                  </ul>
                </div>
              )}

              {selectedCategory === "employees" && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                    Danh sách nhân viên phòng ban
                  </h3>
                  <ul className="space-y-3 text-gray-700 text-lg overflow-y-auto h-[300px]">
                    {userInDepartment.map((employee, index) => (
                      <li
                        key={index}
                        className="p-3 rounded-lg border hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer flex justify-between items-center"
                        onClick={() => setSelectedUser(employee)}
                      >
                        <span>{employee?.ho_ten}</span>
                        {employee?.id === user.id && (
                          <span className="text-xs font-bold text-blue-800 bg-blue-200 px-2 py-0.5 rounded-full">
                            BẠN
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl shadow-inner">
          <PackageOpen className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">
            Chưa có dữ liệu
          </h3>
          <p className="text-gray-500 mt-2 text-center">
            Hiện tại phòng ban của bạn chưa có tài sản số nào.
          </p>
        </div>
      )}

      {/* Modal chi tiết tài sản */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
            <button
              onClick={() => setSelectedAsset(null)}
              className="cursor-pointer hover:opacity-70 absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Chi tiết tài sản
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Tên tài sản: </span>
                {selectedAsset?.ten_tai_san}
              </p>
              <p>
                <span className="font-semibold">Tên nhà cung cấp: </span>
                {selectedAsset?.ten_nha_cung_cap}
              </p>
              <p>
                <span className="font-semibold">Họ tên người nhận: </span>
                {selectedAsset?.ho_ten_nguoi_nhan}
              </p>
              <p>
                <span className="font-semibold">Tên danh mục: </span>
                {selectedAsset?.ten_danh_muc_tai_san}
              </p>
              <p>
                <span className="font-semibold">Ngày thu hồi: </span>
                {formatDateTime(selectedAsset?.ngay_thu_hoi) || "Chưa thu hồi"}
              </p>
              {selectedAsset?.thong_tin && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-lg font-semibold mb-2">
                    Thông tin chi tiết:
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(selectedAsset.thong_tin).map(
                      ([key, value]) => (
                        <p
                          key={key}
                          className="break-words whitespace-pre-wrap"
                        >
                          <span className="font-semibold">{key}: </span>
                          <span className="text-gray-600">{value}</span>
                        </p>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="cursor-pointer hover:opacity-70 absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Chi tiết nhân viên
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Họ và tên: </span>
                {selectedUser?.ho_ten}
              </p>
              <p>
                <span className="font-semibold">Tên đăng nhập: </span>
                {selectedUser?.username}
              </p>
              <p>
                <span className="font-semibold">Số điện thoại: </span>
                {selectedUser?.sdt}
              </p>
              <p>
                <span className="font-semibold">Phòng ban: </span>
                {selectedUser?.ten}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardManager;
