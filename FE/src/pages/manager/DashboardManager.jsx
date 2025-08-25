import { useEffect, useState } from "react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { getLocalStorage } from "../../utils/localStorage";
import { PackageOpen, X } from "lucide-react";

function DashboardManager() {
  const assetLoginInfo = AssetLoginInfoStore();
  const user = getLocalStorage("user");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user.PhongBanId) {
        await assetLoginInfo.getAssetLoginInfoByDepartment(user.PhongBanId);
      }
    };
    fetchData();
  }, []);
  // console.log(selectedAsset);

  const cardBase =
    "flex-1 p-2 rounded-xl shadow-md cursor-pointer transition-transform duration-300 ease-in-out select-none";

  return (
    <div className="p-2 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
        Dashboard Tài sản số
      </h2>

      {assetLoginInfo?.data?.value?.length > 0 ? (
        <>
          <div className="flex gap-8">
            <div
              onClick={() => setSelectedCategory("all")}
              className={`${cardBase} ${
                selectedCategory === "all"
                  ? "border-4 border-blue-600 bg-blue-100 scale-105"
                  : "border border-gray-300 bg-white hover:scale-105"
              }`}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") setSelectedCategory("all");
              }}
              aria-pressed={selectedCategory === "all"}
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Tổng số tài sản số
              </h3>
              <p className="text-4xl font-bold text-blue-900">
                {assetLoginInfo?.data?.value?.length}
              </p>
            </div>
          </div>

          {/* Danh sách chi tiết */}
          {selectedCategory && (
            <div className="mt-6 p-4 border rounded-xl shadow-lg bg-white max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Danh sách tài sản số:{" "}
                {selectedCategory === "all"
                  ? "Tất cả"
                  : selectedCategory === "expiring"
                  ? "Sắp hết hạn"
                  : "Đang chờ xử lý"}
              </h3>

              {assetLoginInfo?.data?.value?.length === 0 ? (
                <p className="text-gray-500 text-lg">Không có tài sản nào.</p>
              ) : (
                <ul className="space-y-3 text-gray-700 text-lg overflow-y-auto h-[300px]">
                  {assetLoginInfo?.data?.value?.map((asset, index) => (
                    <li
                      key={index}
                      className="p-3 rounded-lg border hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      {asset?.ten_tai_san}
                    </li>
                  ))}
                </ul>
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
          <p className="text-gray-500 mt-2">
            Hiện tại phòng ban của bạn chưa có tài sản số nào.
          </p>
        </div>
      )}

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

              {/* Render thong_tin */}
              {selectedAsset?.thong_tin && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-lg font-semibold mb-2">
                    Thông tin chi tiết:
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(selectedAsset.thong_tin).map(
                      ([key, value]) => (
                        <p key={key}>
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
    </div>
  );
}

export default DashboardManager;
