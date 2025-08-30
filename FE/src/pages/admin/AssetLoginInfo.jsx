import FilterPanel from "@/components/FilterPanel";
import AssetDetailModal from "@/components/AssetDetailModal";
import AssetRow from "@/components/AssetRow";
import { AssetLoginInfoStore } from "@/stores/assetLoginInfo";
import { DepartmentStore } from "@/stores/department";
import { useState, useEffect, useMemo } from "react";
function AssetLoginInfo() {
  const { data: allAssetInfo, getAllAssetLoginInfo, updateAssetLoginInfo } = AssetLoginInfoStore();
  const { data: departments, getAllDepartment } = DepartmentStore();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => { getAllDepartment(); }, []);
  useEffect(() => { getAllAssetLoginInfo(page); }, [page]);

  useEffect(() => {
    const total = allAssetInfo?.value?.[0]?.total_count || 0;
    setTotalPages(Math.ceil(total / 20));
  }, [allAssetInfo]);
  // Lọc theo phòng ban
  const filteredByDepartment = useMemo(() => {
    const list = allAssetInfo?.value || [];
    if (selectedDepartment === "all") return list;
    return list.filter(item => item.ten_phong_ban?.toString() === selectedDepartment.toString());
  }, [selectedDepartment, allAssetInfo]);

  // Lọc theo search
  const filteredData = useMemo(() => {
    return filteredByDepartment.filter(
      (item) =>
        item.ten_tai_san?.toLowerCase().includes(search.toLowerCase()) ||
        item.ho_ten_nguoi_nhan?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, filteredByDepartment]);

  const handleEdit = (item) => setSelectedItem(item);

  const handleSave = async (formData) => {
    try {
      await updateAssetLoginInfo(selectedItem.id, formData);
      setSelectedItem(null);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Thông tin đăng nhập tài sản</h1>
        <FilterPanel
          departments={departments || []}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          search={search}
          setSearch={setSearch}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[100vh] overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3">Tên tài sản</th>
                <th className="px-6 py-3">Người nhận</th>
                <th className="px-6 py-3">Phòng ban</th>
                <th className="px-6 py-3">Ngày cấp</th>
                <th className="px-6 py-3">Ngày thu hồi</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.length > 0 ? (
                filteredData.map(item => (
                  <AssetRow
                    key={item?.id}
                    item={item}
                    onView={setSelectedItem}
                    onEdit={handleEdit}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                    Không tìm thấy tài sản nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <AssetDetailModal
          selectedItem={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={handleSave}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Trang {page} / {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AssetLoginInfo;