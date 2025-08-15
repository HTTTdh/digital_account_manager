import { useState } from "react";
import { Eye, Share2, Edit, Trash2, X } from "lucide-react";
import AssetModal from "../../components/AssetModal";

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

  const filteredAssets = mockAssets.filter((asset) => {
    return (
      (selectedCategory === "Tất Cả Tài Sản" ||
        asset.category === selectedCategory) &&
      (selectedStatus === "Tất Cả Trạng Thái" ||
        asset.status === selectedStatus) &&
      asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6">
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

      {isModalOpen && <AssetModal setIsModalOpen={setIsModalOpen} />}

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
            <th className="p-3">THƯƠNG HIỆU</th>
            <th className="p-3">NGÀY HẾT HẠN</th>
            <th className="p-3">TRẠNG THÁI</th>
            <th className="p-3">BỘ PHẬN</th>
            <th className="p-3">THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset) => (
            <tr key={asset.id} className="border-b">
              <td className="p-3">
                <div className="font-medium">{asset.name}</div>
                <div className="text-sm text-gray-500">{asset.link}</div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {asset.cycle}
                </span>
              </td>
              <td className="p-3">
                <span className="bg-green-600 text-white px-3 py-1 rounded">
                  {asset.category}
                </span>
              </td>
              <td className="p-3">{asset.brand}</td>
              <td className="p-3">{asset.expireDate}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded text-white ${
                    asset.status === "Hoạt Động"
                      ? "bg-green-600"
                      : "bg-blue-600"
                  }`}
                >
                  {asset.status}
                </span>
              </td>
              <td className="p-3">{asset.department}</td>
              <td className="p-3 flex space-x-2">
                <button className="p-2 border rounded hover:bg-gray-100">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 border rounded hover:bg-gray-100">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 border rounded hover:bg-gray-100">
                  <Edit className="w-4 h-4 text-yellow-500" />
                </button>
                <button className="p-2 border rounded hover:bg-gray-100">
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
