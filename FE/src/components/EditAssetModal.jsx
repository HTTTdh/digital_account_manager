import { useState } from "react";
import { AssetStore } from "../stores/asset";

export default function EditAssetModal({ asset, dataCategory, onClose }) {
  const assetStore = AssetStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    ten_tai_san: asset.ten_tai_san || "",
    DanhMucTaiSanId: asset.danh_muc_tai_san_id || "",
    tong_so_luong: asset.tong_so_luong || 0,
    so_luong_con: asset.so_luong_con || 0,
    thong_tin: asset.thong_tin || {},
  });

  const [newField, setNewField] = useState({ key: "", value: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThongTinChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      thong_tin: { ...prev.thong_tin, [key]: value },
    }));
  };

  const handleAddThongTin = () => {
    if (!newField.key.trim()) return;
    setFormData((prev) => ({
      ...prev,
      thong_tin: { ...prev.thong_tin, [newField.key]: newField.value },
    }));
    setNewField({ key: "", value: "" });
  };

  const handleDeleteThongTin = (keyToDelete) => {
    setFormData((prev) => {
      const { [keyToDelete]: _, ...remainingThongTin } = prev.thong_tin;
      return { ...prev, thong_tin: remainingThongTin };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      let finalData = { ...formData };
      if (newField.key.trim()) {
        finalData.thong_tin[newField.key] = newField.value;
      }

      const response = await assetStore.updateAsset(asset.id, finalData);

      if (response) {
        setSuccessMessage("✅ Cập nhật thành công!");
        await assetStore.getAllAsset();
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      console.error("Failed to update asset:", error);
    } finally {
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white p-6 rounded-lg w-[600px] shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute cursor-pointer  top-3 right-4 text-gray-500 hover:text-gray-800 text-4xl font-bold disabled:text-gray-300"
          disabled={isSubmitting}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Cập nhật tài sản</h2>
        {successMessage && (
          <div className="mb-4 text-center text-green-600 font-semibold">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Tên tài sản:</label>
            <input
              type="text"
              name="ten_tai_san"
              value={formData.ten_tai_san}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Danh mục:</label>
            <select
              name="DanhMucTaiSanId"
              value={formData.DanhMucTaiSanId}
              onChange={handleChange}
              className="w-full border rounded p-2"
              disabled={isSubmitting}
            >
              {dataCategory.map((cat) => (
                <option key={cat?.id} value={cat?.id}>
                  {cat?.ten}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Tổng số lượng:
              </label>
              <input
                type="number"
                name="tong_so_luong"
                value={formData.tong_so_luong}
                onChange={handleChange}
                className="w-full border rounded p-2"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Số lượng còn:</label>
              <input
                type="number"
                name="so_luong_con"
                value={formData.so_luong_con}
                onChange={handleChange}
                className="w-full border rounded p-2"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Thông tin chi tiết:
            </label>
            <div className="space-y-2">
              {Object.entries(formData.thong_tin).map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center"
                >
                  <label className="text-sm font-medium truncate pr-2">
                    {key}:
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleThongTinChange(key, e.target.value)}
                    className="border rounded p-2 w-full"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteThongTin(key)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-300"
                    disabled={isSubmitting}
                  >
                    X
                  </button>
                </div>
              ))}

              {/* Thêm field mới */}
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center mt-3">
                <input
                  type="text"
                  placeholder="Tên trường (key)"
                  value={newField.key}
                  onChange={(e) =>
                    setNewField({ ...newField, key: e.target.value })
                  }
                  className="border rounded p-2"
                  disabled={isSubmitting}
                />
                <input
                  type="text"
                  placeholder="Giá trị (value)"
                  value={newField.value}
                  onChange={(e) =>
                    setNewField({ ...newField, value: e.target.value })
                  }
                  className="border rounded p-2"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={handleAddThongTin}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
                  disabled={isSubmitting}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
