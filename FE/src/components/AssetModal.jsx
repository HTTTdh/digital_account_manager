import { useState } from "react";
import { X } from "lucide-react";
import { toConfigJSON } from "../utils/helpers";

export default function AssetModal({ setIsModalOpen }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const customData = {};
    customFields.forEach(({ key, value }) => {
      if (key.trim()) {
        customData[key] = value;
      }
    });

    const payload = {
      name: e.target.name.value,
      supplier: e.target.supplier.value,
      quantity: e.target.quantity.value,
      custom_info: customData,
    };

    console.log("Dữ liệu gửi đi:", payload);
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

          <span>Số lượng còn: 10</span>

          {/* Thông tin tùy biến */}
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
