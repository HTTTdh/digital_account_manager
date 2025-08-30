import { useEffect, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import AssetModal from "../../components/AssetModal";
import EditAssetModal from "../../components/EditAssetModal";
import ViewAssetModal from "../../components/ViewAssetModal";
import { AssetStore } from "../../stores/asset";
import { ThuongHieuStore } from "../../stores/thuonghieu";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
export default function AssetManager() {
  const { data: assets, getAllAsset, deleteAsset } = AssetStore();
  const { getAllThuongHieu } = ThuongHieuStore();

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("Tất Cả Trạng Thái");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch categories và assets lần đầu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const thuonghieuData = await getAllThuongHieu();
        setCategories(thuonghieuData || []);
        await getAllAsset();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Modal handlers
  const handleViewClick = (asset) => {
    setSelectedAsset(asset);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (asset) => {
    setSelectedAsset(asset);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteAsset(id);
      toast.success("Xóa tài sản thành công");
    } catch (err) {
      console.error(err);
      toast.error("Xóa tài sản thất bại");
    }
  };

  // Lọc dữ liệu trực tiếp từ store
  const filteredAssets = (assets || []).filter((item) => {
    const matchCategory =
      selectedCategoryId === "all" || item.danh_muc_tai_san_id === parseInt(selectedCategoryId);
    const matchStatus = selectedStatus === "Tất Cả Trạng Thái" || item.status === selectedStatus;
    const matchSearch = item.ten_tai_san?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchStatus && matchSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản Lý Tài Sản</h1>
          <p className="text-gray-500">Trang quản lý và theo dõi tất cả tài sản của bạn</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>+ Thêm tài sản</Button>
      </div>

      {/* Modals */}
      {isAddModalOpen && <AssetModal dataCategory={categories} setIsModalOpen={setIsAddModalOpen} />}
      {isViewModalOpen && selectedAsset && (
        <ViewAssetModal asset={selectedAsset} open={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />
      )}
      {isEditModalOpen && selectedAsset && (
        <EditAssetModal asset={selectedAsset} dataCategory={categories} onClose={() => setIsEditModalOpen(false)} />
      )}

      {/* Bộ lọc */}
      <div className="grid grid-cols-3 gap-4">
        <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Tất Cả Danh Mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất Cả Danh Mục</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {c.ten}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Tất Cả Trạng Thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tất Cả Trạng Thái">Tất Cả Trạng Thái</SelectItem>
            <SelectItem value="Hoạt động">Hoạt động</SelectItem>
            <SelectItem value="Ngừng sử dụng">Ngừng sử dụng</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Tìm kiếm tài sản..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <TableHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <TableRow>
            <TableHead className="text-left font-semibold text-gray-700">TÀI SẢN</TableHead>
            <TableHead className="text-center font-semibold text-gray-700">DANH MỤC</TableHead>
            <TableHead className="text-center font-semibold text-gray-700">THÔNG TIN</TableHead>
            <TableHead className="text-center font-semibold text-gray-700">TỔNG</TableHead>
            <TableHead className="text-center font-semibold text-gray-700">CÒN</TableHead>
            <TableHead className="text-center font-semibold text-gray-700">THAO TÁC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssets.map((item) => (
            <TableRow key={item.id} className="hover:bg-blue-50 transition-colors even:bg-gray-50">
              <TableCell>
                <div className="font-medium text-gray-900">{item.ten_tai_san}</div>
                <div className="text-sm text-gray-500">{item.danh_muc_tai_san_link}</div>
              </TableCell>
              <TableCell className="text-center">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {categories.find((c) => c.id === item.danh_muc_tai_san_id)?.ten}
                </span>
              </TableCell>
              <TableCell className="text-center text-gray-600">
                {Object.entries(item.thong_tin).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-semibold">{key}: </span>
                    {value}
                  </p>
                ))}
              </TableCell>
              <TableCell className="text-center font-semibold">{item.tong_so_luong}</TableCell>
              <TableCell className="text-center font-semibold text-green-600">{item.so_luong_con}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center items-center gap-2">
                  <Button variant="outline" size="icon" className="hover:bg-blue-100" onClick={() => handleViewClick(item)}>
                    <Eye className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-yellow-100" onClick={() => handleEditClick(item)}>
                    <Edit className="w-4 h-4 text-yellow-500" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-red-100" onClick={() => handleDeleteClick(item.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
