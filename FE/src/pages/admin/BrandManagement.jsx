import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ExternalLink, Loader2, X } from "lucide-react";
import { ThuongHieuStore } from "../../stores/thuonghieu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function BrandManagement() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const thuonghieu = ThuongHieuStore();

  // Form states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dl = await thuonghieu.getAllThuongHieu();
        setBrands(dl.data || []);
      } catch (err) {
        console.error("Failed to fetch brands:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handler thêm mới
  const handleAddBrand = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const newBrand = {
      ten: data.get("ten"),
      link: data.get("link"),
      lien_he: data.get("lien_he"),
    };
    await thuonghieu.createThuongHieu(newBrand);
    const dl = await thuonghieu.getAllThuongHieu();
    setBrands(dl.data || []);
    setIsAddOpen(false);
    form.reset();
  };

  // Handler sửa
  const handleEditBrand = async (e) => {
    e.preventDefault();
    if (!selectedBrand) return;

    const form = e.target;
    const data = new FormData(form);
    const updated = {
      ten: data.get("ten"),
      link: data.get("link"),
      lien_he: data.get("lien_he"),
    };

    try {
      await thuonghieu.updateThuongHieu(selectedBrand.id, updated);
      const dl = await thuonghieu.getAllThuongHieu();
      setBrands(dl.data || []);
    } catch (err) {
      console.error("Failed to update brand:", err);
    } finally {
      setIsEditOpen(false);
      setSelectedBrand(null);
    }
  };

  // Handler xóa
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này không?")) {
      await thuonghieu.deleteThuongHieu(id);
      const dl = await thuonghieu.getAllThuongHieu();
      setBrands(dl.data || []);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <span className="text-blue-700">🏢</span>
          <span>Quản Lý Thương Hiệu</span>
        </h1>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm Thương Hiệu
        </Button>
      </div>

      {loading && (
        <div className="mb-4 flex items-center space-x-2 text-blue-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Đang tải dữ liệu...</span>
        </div>
      )}

      {!loading && brands.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏢</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chưa có thương hiệu nào
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {brand.ten}
              </h3>
              <p className="text-sm text-gray-600 mb-2 flex items-center space-x-1">
                <ExternalLink className="w-4 h-4 text-blue-500" />
                <a
                  href={brand.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline truncate"
                >
                  {brand.link}
                </a>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                📧{" "}
                <a
                  href={`mailto:${brand.lien_he}`}
                  className="text-blue-600 hover:underline"
                >
                  {brand.lien_he}
                </a>
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedBrand(brand);
                    setIsEditOpen(true);
                  }}
                  className="flex items-center px-3 py-1 border rounded-lg border-yellow-300 hover:bg-yellow-50"
                >
                  <Edit className="w-4 h-4 text-yellow-500 mr-1" /> Sửa
                </button>
                <button
                  onClick={() => handleDelete(brand.id)}
                  className="flex items-center px-3 py-1 border rounded-lg border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 text-red-500 mr-1" /> Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add */}


      {isAddOpen && (
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm Thương Hiệu</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleAddBrand} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ten">Tên thương hiệu</Label>
                <Input id="ten" name="ten" placeholder="Nhập tên thương hiệu" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Website</Label>
                <Input id="link" name="link" placeholder="https://example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lien_he">Email liên hệ</Label>
                <Input id="lien_he" name="lien_he" placeholder="email@example.com" />
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">Lưu</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal Edit */}
      {isEditOpen && selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-[500px] relative">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">Sửa Thương Hiệu</h2>
            <form onSubmit={handleEditBrand} className="space-y-4">
              <input
                name="ten"
                defaultValue={selectedBrand.ten}
                className="border w-full p-2 rounded"
                required
              />
              <input
                name="link"
                defaultValue={selectedBrand.link}
                className="border w-full p-2 rounded"
              />
              <input
                name="lien_he"
                defaultValue={selectedBrand.lien_he}
                className="border w-full p-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
