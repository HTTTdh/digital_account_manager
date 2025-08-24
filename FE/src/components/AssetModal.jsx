import { useState } from "react";
import { X } from "lucide-react";
import { AssetStore } from "../stores/asset";

export default function AssetModal({ dataCategory, setIsModalOpen }) {
  const asset = AssetStore();

  const defaultFields = [
    { key: "Email", value: "" },
    { key: "Username", value: "" },
    { key: "Password", value: "" },
  ];

  const [customFields, setCustomFields] = useState(defaultFields);

  const handleAddField = () => {
    setCustomFields([...customFields, { key: "", value: "" }]);
  };

  const handleRemoveField = (index) => {
    const newFields = customFields.filter((_, i) => i !== index);
    setCustomFields(newFields);
  };

  const handleChangeField = (index, field, val) => {
    const newFields = [...customFields];
    newFields[index][field] = val;
    setCustomFields(newFields);
  };

  const handleResetDefault = () => {
    setCustomFields(defaultFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customData = {};
    customFields.forEach(({ key, value }) => {
      if (key.trim()) {
        customData[key] = value;
      }
    });
    const payload = {
      ten_tai_san: e.target.name.value,
      ten_nha_cung_cap: e.target.supplier.value,
      thong_tin: customData,
      tong_so_luong: e.target.quantity.value,
      DanhMucTaiSanId: e.target.category.value,
      so_luong_con: e.target.quantity1.value,
    };
    await asset.createAsset(payload);
    await asset.getAllAsset();
    setIsModalOpen(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg py-2 px-6 w-[600px] relative"
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5 cursor-pointer hover:opacity-60" />
        </button>
        <h2 className="text-xl font-bold mb-2 text-center">Thêm Tài Sản Mới</h2>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tài sản:
            </label>
            <input
              name="name"
              type="text"
              placeholder="Nhập tên tài sản"
              className="w-full border rounded-lg p-2  "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên nhà cung cấp:
            </label>
            <input
              name="supplier"
              type="text"
              placeholder="Nhập tên nhà cung cấp"
              className="w-full border rounded-lg p-2 "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng:
            </label>
            <input
              name="quantity"
              type="number"
              placeholder="Nhập số lượng"
              className="w-full border rounded-lg p-2 "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng còn lại:
            </label>
            <input
              name="quantity1"
              type="number"
              placeholder="Nhập số lượng còn lại"
              className="w-full border rounded-lg p-2 "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn danh mục:
            </label>
            <select
              name="category"
              className="w-full border rounded-lg p-2 "
              defaultValue=""
            >
              <option value="" disabled>
                Chọn danh mục tài sản
              </option>
              {dataCategory?.map((cat) => (
                <option key={cat?.id} value={cat?.id}>
                  {cat?.ten}
                </option>
              ))}
            </select>
          </div>

          {/* ---- THAY ĐỔI TỪ ĐÂY ---- */}
          <div className="border rounded-lg p-3 mt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-gray-800">
                Thông tin tùy biến
              </label>
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={handleAddField}
                  className="text-blue-600 hover:underline text-sm"
                >
                  + Thêm trường
                </button>
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="text-gray-600 hover:underline text-sm"
                >
                  ↺ Reset mặc định
                </button>
              </div>
            </div>
            <div className="max-h-[150px] overflow-y-auto pr-2 space-y-2">
              {customFields.map((field, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="Tên thuộc tính"
                    value={field.key}
                    onChange={(e) =>
                      handleChangeField(index, "key", e.target.value)
                    }
                    className="flex-1 border rounded-lg p-2 "
                  />
                  <input
                    type="text"
                    placeholder="Giá trị"
                    value={field.value}
                    onChange={(e) =>
                      handleChangeField(index, "value", e.target.value)
                    }
                    className="flex-1 border rounded-lg p-2 "
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="px-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* ---- THAY ĐỔI ĐẾN ĐÂY ---- */}

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
