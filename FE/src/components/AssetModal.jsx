import { useState } from "react";
import { X } from "lucide-react";
import { AssetStore } from "../stores/asset";

export default function AssetModal({ dataCategory, setIsModalOpen }) {
  const asset = AssetStore();
  const [customFields, setCustomFields] = useState([{ key: "", value: "" }]);

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
    console.log("Dữ liệu gửi đi:", payload);
    const response = await asset.createAsset(payload);
    // console.log(response);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[500px] relative shadow-lg">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">Thêm Tài Sản Mới</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Tên tài sản"
            className="w-full border rounded p-2"
          />
          <input
            name="supplier"
            type="text"
            placeholder="Tên nhà cung cấp"
            className="w-full border rounded p-2"
          />
          <input
            name="quantity"
            type="number"
            placeholder="Số lượng"
            className="w-full border rounded p-2"
          />

          <select
            name="category"
            className="w-full border rounded p-2"
            defaultValue=""
          >
            <option value="" disabled>
              Chọn danh mục tài sản
            </option>
            {dataCategory.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.ten}
              </option>
            ))}
          </select>

          <input
            name="quantity1"
            type="number"
            placeholder="Số lượng còn lại"
            className="w-full border rounded p-2"
          />

          <div className="border rounded p-3 mt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">Thông tin tùy biến</label>
              <button
                type="button"
                onClick={handleAddField}
                className="text-blue-600 hover:underline text-sm"
              >
                + Thêm trường
              </button>
            </div>

            {customFields.map((field, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Tên thuộc tính"
                  value={field.key}
                  onChange={(e) =>
                    handleChangeField(index, "key", e.target.value)
                  }
                  className="flex-1 border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Giá trị"
                  value={field.value}
                  onChange={(e) =>
                    handleChangeField(index, "value", e.target.value)
                  }
                  className="flex-1 border rounded p-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="px-2 bg-red-500 text-white rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
