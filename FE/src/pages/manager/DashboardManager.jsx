import React, { useEffect, useState } from "react";

function DashboardManager() {
  const [stats, setStats] = useState({
    totalAssets: 0,
    assetsExpiringSoon: 0,
    allocationsPending: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [assetList, setAssetList] = useState([]);

  const departmentId = "dep123";

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const data = {
          totalAssets: 42,
          assetsExpiringSoon: 5,
          allocationsPending: 3,
        };
        setStats(data);
      } catch (err) {
        setError("Không thể tải thông tin thống kê.");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [departmentId]);

  const mockAssets = {
    all: [
      { id: 1, name: "Tài khoản Google Workspace" },
      { id: 2, name: "Tên miền company.com" },
      { id: 3, name: "Máy chủ AWS EC2" },
      { id: 4, name: "Giấy phép phần mềm Adobe Creative Cloud" },
    ],
    expiring: [
      { id: 5, name: "Tên miền company.vn (hết hạn 15 ngày nữa)" },
      { id: 6, name: "Chứng chỉ SSL (hết hạn 10 ngày nữa)" },
    ],
    pending: [
      { id: 7, name: "Yêu cầu tạo tài khoản GitHub cho nhân viên mới" },
      { id: 8, name: "Yêu cầu mua license phần mềm Jira" },
    ],
  };

  function handleClickCategory(category) {
    setSelectedCategory(category);
    setAssetList(mockAssets[category] || []);
  }

  if (loading)
    return (
      <div className="p-4 text-gray-500 text-center">Đang tải dữ liệu...</div>
    );
  if (error)
    return (
      <div className="p-4 text-red-500 text-center font-semibold">{error}</div>
    );

  const cardBase =
    "flex-1 p-6 rounded-xl shadow-md cursor-pointer transition-transform duration-300 ease-in-out select-none";

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
        Dashboard Tài sản số
      </h2>

      <div className="flex gap-8">
        <div
          onClick={() => handleClickCategory("all")}
          className={`${cardBase} ${
            selectedCategory === "all"
              ? "border-4 border-blue-600 bg-blue-100 scale-105"
              : "border border-gray-300 bg-white hover:scale-105"
          }`}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleClickCategory("all");
          }}
          aria-pressed={selectedCategory === "all"}
        >
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            Tổng số tài sản số
          </h3>
          <p className="text-4xl font-bold text-blue-900">
            {stats.totalAssets}
          </p>
        </div>

        <div
          onClick={() => handleClickCategory("expiring")}
          className={`${cardBase} ${
            selectedCategory === "expiring"
              ? "border-4 border-orange-500 bg-orange-100 scale-105"
              : "border border-orange-300 bg-orange-50 hover:scale-105"
          }`}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleClickCategory("expiring");
          }}
          aria-pressed={selectedCategory === "expiring"}
        >
          <h3 className="text-xl font-semibold text-orange-700 mb-2">
            Sắp hết hạn
          </h3>
          <p className="text-4xl font-bold text-orange-800">
            {stats.assetsExpiringSoon}
          </p>
        </div>

        <div
          onClick={() => handleClickCategory("pending")}
          className={`${cardBase} ${
            selectedCategory === "pending"
              ? "border-4 border-blue-700 bg-blue-100 scale-105"
              : "border border-blue-300 bg-blue-50 hover:scale-105"
          }`}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleClickCategory("pending");
          }}
          aria-pressed={selectedCategory === "pending"}
        >
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Yêu cầu đang chờ
          </h3>
          <p className="text-4xl font-bold text-blue-900">
            {stats.allocationsPending}
          </p>
        </div>
      </div>

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
          {assetList.length === 0 ? (
            <p className="text-gray-500 text-lg">Không có tài sản nào.</p>
          ) : (
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
              {assetList.map((asset) => (
                <li
                  key={asset.id}
                  className="hover:text-blue-600 transition-colors"
                >
                  {asset.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardManager;
