import { useEffect, useState, useMemo } from "react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { X, Eye } from "lucide-react";
import { DepartmentStore } from "../../stores/department";
import { formatDate } from "../../utils/formatDate";

function AssetLoginInfo() {
  const assetLoginInfo = AssetLoginInfoStore();
  const department = DepartmentStore();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    assetLoginInfo.getAllAssetLoginInfo(page);
    department.getAllDepartment();
  }, [page]);

  useEffect(() => {
    const total = assetLoginInfo.data?.value?.[0]?.total_count || 0;
    setTotalPages(Math.ceil(total / 20));
  }, [assetLoginInfo.data]);

  const departments = department.data?.data || [];
  const allAssetInfo = assetLoginInfo.data?.value || [];

  const filteredByDepartment = useMemo(() => {
    if (selectedDepartment === "all") {
      return allAssetInfo;
    }
    return allAssetInfo.filter(
      (item) => item.ten_phong_ban === selectedDepartment
    );
  }, [selectedDepartment, allAssetInfo]);

  const filteredData = useMemo(() => {
    if (selectedDepartment === "all") return filteredByDepartment;

    return filteredByDepartment.filter(
      (item) =>
        item.ten_tai_san.toLowerCase().includes(search.toLowerCase()) ||
        item.ho_ten_nguoi_nhan.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, filteredByDepartment, selectedDepartment]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Thông tin đăng nhập tài sản
        </h1>
        <div className="flex gap-4 items-center">
          {/* Chọn phòng ban */}
          <select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setSearch(""); // reset search khi đổi phòng ban
            }}
            className="w-64 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          >
            <option value="all">Tất cả phòng ban</option>
            {departments.map((dept) => (
              <option key={dept?.id} value={dept?.ten}>
                {dept?.ten}
              </option>
            ))}
          </select>

          {/* Ô input chỉ hiển thị khi chọn 1 phòng ban cụ thể */}

          {selectedDepartment !== "all" && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên nhân viên..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg p-2 w-64 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[100vh] overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tên tài sản
                </th>
                <th scope="col" className="px-6 py-3">
                  Người nhận
                </th>
                <th scope="col" className="px-6 py-3">
                  Phòng ban
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày cấp
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày thu hồi
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item?.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {item?.ten_tai_san}
                    </td>
                    <td className="px-6 py-4">{item?.ho_ten_nguoi_nhan}</td>
                    <td className="px-6 py-4">{item?.ten_phong_ban}</td>
                    <td className="px-6 py-4">{formatDate(item?.ngay_cap)}</td>
                    <td className="px-6 py-4">
                      {formatDate(item?.ngay_thu_hoi)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${item?.trang_thai.toLowerCase() === "đang sử dụng"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {item?.trang_thai}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    Không tìm thấy tài sản nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal chi tiết giữ nguyên */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="cursor-pointer hover:opacity-70 absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Chi tiết đăng nhập
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Tài sản: </span>
                {selectedItem?.ten_tai_san}
              </p>
              <p>
                <span className="font-semibold">Người nhận: </span>
                {selectedItem?.ho_ten_nguoi_nhan}
              </p>
              <p>
                <span className="font-semibold">Người yêu cầu: </span>
                {selectedItem?.ho_ten_nguoi_yeu_cau}
              </p>
              <p>
                <span className="font-semibold">Danh mục tài sản: </span>
                {selectedItem?.ten_danh_muc_tai_san}
              </p>
              <p>
                <span className="font-semibold">Ngày cấp: </span>
                {formatDate(selectedItem?.ngay_cap)}
              </p>
              <p>
                <span className="font-semibold">Ngày thu hồi: </span>
                {formatDate(selectedItem?.ngay_thu_hoi)}
              </p>
              <div className="mt-4 border-t pt-4">
                <h4 className="text-lg font-semibold mb-2">
                  Thông tin cấp phát:
                </h4>
                <div className="space-y-2">
                  {Object.entries(selectedItem.thong_tin).map(
                    ([key, value]) => (
                      <p key={key}>
                        <span className="font-semibold">{key}: </span>
                        <span className="text-gray-600 break-all">{value}</span>
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AssetLoginInfo;