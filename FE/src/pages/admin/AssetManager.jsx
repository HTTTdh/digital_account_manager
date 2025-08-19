import { useEffect, useState } from "react";
import { Eye, Share2, Edit, Trash2 } from "lucide-react";
import AssetModal from "../../components/AssetModal";
import { AssetStore } from "../../stores/asset";
import { CategoryStore } from "../../stores/category";
import ViewAssetModal from "../../components/ViewAssetModal";

const statuses = ["Tất Cả Trạng Thái", "Đã Cấp Phát", "Hoạt Động", "Chưa Cấp"];

export default function AssetManager() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all"); // ✅ lọc theo id
  const [selectedStatus, setSelectedStatus] = useState("Tất Cả Trạng Thái");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const asset = AssetStore();
  const category = CategoryStore();
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const danhmuc = await category.getAllCategory();
      await asset.getAllAsset();
      setDataCategory(danhmuc.data);
    };
    fetchData();
  }, []);

  const handleViewClick = (asset) => {
    setSelectedAsset(asset);
    setIsViewModalOpen(true);
  };

  const handleDeleteAsset = async (id) => {
    await asset.deleteAsset(id);
    await asset.getAllAsset();
  };

  // ✅ Lọc dữ liệu
  const filteredAssets = asset.data.filter((item) => {
    const matchCategory =
      selectedCategoryId === "all" ||
      item.danh_muc_tai_san_id === parseInt(selectedCategoryId);

    const matchStatus =
      selectedStatus === "Tất Cả Trạng Thái" || item.status === selectedStatus;

    const matchSearch = item.ten_tai_san
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchStatus && matchSearch;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quản Lý Tài Sản</h1>
          <p className="text-gray-500">
            Trang quản lý và theo dõi tất cả tài sản của bạn
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            + Thêm Tài Sản
          </button>
        </div>
      </div>

      {/* Modal thêm mới */}
      {isModalOpen && (
        <AssetModal
          dataCategory={dataCategory}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isViewModalOpen && selectedAsset && (
        <ViewAssetModal
          asset={selectedAsset}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      {/* Bộ lọc */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* ✅ Select danh mục */}
        <select
          className="w-full border rounded p-2"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="all">Tất Cả Danh Mục</option>
          {dataCategory?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.ten}
            </option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="border rounded p-2"
          placeholder="Tên tài sản..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Bảng */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <th className="p-3 text-left">TÀI SẢN</th>
            <th className="p-3">DANH MỤC</th>
            <th className="p-3">NHÀ CUNG CẤP</th>
            <th className="p-3">TỔNG SỐ LƯỢNG</th>
            <th className="p-3">SỐ LƯỢNG CÒN</th>
            <th className="p-3">THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.length > 0 ? (
            filteredAssets.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">
                  <div className="font-medium">{item.ten_tai_san}</div>
                  <div className="text-sm text-gray-500">
                    {item.danh_muc_tai_san_link}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <span className="bg-green-600 text-white px-3 py-1 rounded">
                    {
                      dataCategory.find(
                        (c) => c.id === item.danh_muc_tai_san_id
                      )?.ten
                    }
                  </span>
                </td>
                <td className="p-3 text-center">{item.ten_nha_cung_cap}</td>
                <td className="p-3 text-center">{item.tong_so_luong}</td>
                <td className="p-3 text-center">{item.so_luong_con}</td>

                <td className="p-3 flex space-x-2">
                  <button
                    onClick={() => handleViewClick(item)}
                    className="p-2 border rounded hover:bg-gray-100 hover:cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 border rounded hover:bg-gray-100 hover:cursor-pointer">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 border rounded hover:bg-gray-100 hover:cursor-pointer">
                    <Edit className="w-4 h-4 text-yellow-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteAsset(item.id)}
                    className="p-2 border rounded hover:bg-gray-100 hover:cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                Không có tài sản nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
