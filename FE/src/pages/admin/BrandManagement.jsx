import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ExternalLink, Loader2, X } from "lucide-react";
import { ThuongHieuStore } from "../../stores/thuonghieu";
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
        console.log("Brands fetched successfully:", dl);
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
  const handleAddBrand = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const newBrand = {
      ten: data.get("ten"),
      link: data.get("link"),
      lien_he: data.get("lien_he"),
    };
    const result = thuonghieu.createThuongHieu(newBrand);
    console.log("New brand created:", result);
    // Cập nhật danh sách thương hiệu
    setBrands([...brands, newBrand]);
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
      const result = await thuonghieu.updateThuongHieu(
        selectedBrand.id,
        updated
      );
      console.log("Brand updated:", result);

      // gọi API load lại brands
      const dl = await thuonghieu.getAllThuongHieu();
      setBrands(dl.data || []);
    } catch (err) {
      console.error("Failed to update brand:", err);
    } finally {
      setLoading(false);
      setIsEditOpen(false);
      setSelectedBrand(null);
    }
  };

  // Handler xóa
  // const handleDelete = (id) => {
  //   if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này không?")) {
  //     const result = thuonghieu.deleteThuongHieu(id)
  //     console.log("Brand deleted:", result)
  //     const dl = thuonghieu.getAllThuongHieu()
  //     setBrands(dl.data || [])
  //   }
  // }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <span className="text-blue-700">🏢</span>
          <span>Quản Lý Thương Hiệu</span>
        </h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:from-blue-600 hover:to-purple-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="cursor-pointer hover:opacity-70">
            Thêm Thương Hiệu Mới
          </span>
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mb-4 flex items-center space-x-2 text-blue-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Đang tải dữ liệu...</span>
        </div>
      )}

      {/* Empty */}
      {!loading && brands.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏢</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chưa có thương hiệu nào
          </h3>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <th className="p-3 text-center">TÊN THƯƠNG HIỆU</th>
                <th className="p-3 text-center">WEBSITE</th>
                <th className="p-3 text-center">Liên hệ</th>
                <th className="p-3 rounded-tr-lg text-center">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr
                  key={`${index}`}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-bold text-center">{brand.ten}</td>
                  <td className="p-3 text-blue-500 text-center">
                    <a
                      href={brand.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center space-x-1"
                    >
                      <span className="truncate ">{brand.link}</span>
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
                  </td>

                  <td className="p-3 text-blue-500 text-center">
                    <a href={`mailto:${brand.lien_he}`}>{brand.lien_he}</a>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => {
                          setSelectedBrand(brand);
                          setIsEditOpen(true);
                        }}
                        className="p-2 border border-yellow-300 rounded hover:bg-yellow-50"
                      >
                        <Edit className="w-4 h-4 text-yellow-500 hover:cursor-pointer" />
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="p-2 border border-red-300 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 text-red-500 hover:cursor-pointer" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Add */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-[500px] relative">
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5 cursor-pointer hover:opacity-60" />
            </button>
            <h2 className="text-xl font-bold mb-4">Thêm Thương Hiệu</h2>
            <form onSubmit={handleAddBrand} className="space-y-4">
              <input
                name="ten"
                placeholder="Tên thương hiệu"
                className="border w-full p-2 rounded"
                required
              />
              <input
                name="link"
                placeholder="Website"
                className="border w-full p-2 rounded"
              />
              <input
                name="lien_he"
                placeholder="Email liên hệ"
                className="border w-full p-2 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="cursor-pointer hover:opacity-55 px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="cursor-pointer hover:opacity-70 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {isEditOpen && selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-[500px] relative">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5 cursor-pointer hover:opacity-60" />
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
                  className="cursor-pointer hover:opacity-55 px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="cursor-pointer hover:opacity-70 px-4 py-2 bg-yellow-500 text-white rounded"
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
