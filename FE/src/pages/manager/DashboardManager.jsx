import { useEffect, useState } from "react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { getLocalStorage } from "../../utils/localStorage";

function DashboardManager() {
  const assetLoginInfo = AssetLoginInfoStore();
  const user = getLocalStorage("user");

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user.PhongBanId) {
        const response = await assetLoginInfo.getAssetLoginInfoByDepartment(
          user.PhongBanId
        );
        console.log(response);
      }
    };
    fetchData();
  }, []);

  const cardBase =
    "flex-1 p-6 rounded-xl shadow-md cursor-pointer transition-transform duration-300 ease-in-out select-none";

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
        Dashboard Tài sản số
      </h2>

      {assetLoginInfo?.data?.value?.length > 0 ? (
        <>
          {/* Card tổng số tài sản */}
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
            <div
              className="mt-12 p-6 border rounded-xl shadow-lg bg-white max-w-4xl mx-auto"
              aria-live="polite"
            >
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
                <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
                  {assetLoginInfo?.data?.value?.map((asset, index) => (
                    <li
                      key={index}
                      className="hover:text-blue-600 transition-colors"
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
        <div>Hiện tại phòng ban bạn chưa có dữ liệu</div>
      )}
    </div>
  );
}

export default DashboardManager;
