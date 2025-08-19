import { useEffect, useState } from "react";
import { Eye, Share2, Edit, Trash2, X } from "lucide-react";
import AssetModal from "../../components/AssetModal";
import { AssetStore } from "../../stores/asset";
import { CategoryStore } from "../../stores/category";
import ViewAssetModal from "../../components/ViewAssetModal";

const assetCategories = [
  "Tất Cả Tài Sản",
  "Domain",
  "Hosting",
  "Website",
  "Mạng Xã Hội",
  "AI",
  "Khác",
];
const statuses = ["Tất Cả Trạng Thái", "Đã Cấp Phát", "Hoạt Động", "Chưa Cấp"];

const mockAssets = [
  {
    id: 1,
    name: "Email Hosting - 100 accounts",
    link: "https://mail.pavietnam.vn",
    category: "Hosting",
    brand: "Pavietnam",
    expireDate: "18/11/2025",
    status: "Đã Cấp Phát",
    department: "Không xác định (1)",
    cycle: "Hàng năm",
  },
  {
    id: 2,
    name: "VPS 4GB - Production Server",
    link: "https://vps.viettelidc.com.vn",
    category: "Hosting",
    brand: "Viettel",
    expireDate: "14/10/2025",
    status: "Đã Cấp Phát",
    department: "Không xác định (1)",
    cycle: "Hàng quý",
  },
  {
    id: 3,
    name: "Hosting 2GB - backup server",
    link: "https://cpanel.pavietnam.vn",
    category: "Hosting",
    brand: "Pavietnam",
    expireDate: "29/10/2025",
    status: "Hoạt Động",
    department: "Chưa cấp",
    cycle: "Hàng năm",
  },
];

export default function AssetManager() {
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả Tài Sản");
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

  const filteredAssets = asset.data.filter((item) => {
    return (
      (selectedCategory === "Tất Cả Tài Sản" ||
        item.category === selectedCategory) &&
      (selectedStatus === "Tất Cả Trạng Thái" ||
        item.status === selectedStatus) &&
      item.ten_tai_san?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  console.log(asset.data);

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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
        <select
          className="border rounded p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {assetCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
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
          {asset.data.length > 0 &&
            asset.data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">
                  <div className="font-medium">{item.ten_tai_san}</div>
                  <div className="text-sm text-gray-500">
                    {item.danh_muc_tai_san_link}
                  </div>
                </td>
                <td className="p-3 text-center">
                  <span className="bg-green-600 text-white px-3 py-1 rounded">
                    {item.danh_muc_tai_san_ten}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className="bg-green-600 text-white px-3 py-1 rounded">
                    {item.ten_nha_cung_cap}
                  </span>
                </td>
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
            ))}
        </tbody>
      </table>
    </div>
  );
}
