import React, { useState, useEffect } from "react";

export default function AddAccountModal({
  isOpen,
  onClose,
  onSave,
  currentRequest,
}) {
  const [fields, setFields] = useState([{ key: "", value: "" }]);

  useEffect(() => {
    if (isOpen) {
      setFields([{ key: "", value: "" }]);
    }
  }, [isOpen]);

  const handleFieldChange = (index, field, newValue) => {
    const updatedFields = [...fields];
    updatedFields[index][field] = newValue;
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([...fields, { key: "", value: "" }]);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const jsonData = {};
    fields.forEach((item) => {
      if (item.key.trim()) {
        jsonData[item.key] = item.value;
      }
    });
    onSave(jsonData);
  };

  if (!isOpen || !currentRequest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 z-10">
        <h2 className="text-xl font-bold mb-4">
          Duyệt yêu cầu: {currentRequest.noi_dung}
        </h2>

        {fields.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Tên trường (key)"
              value={item.key}
              onChange={(e) => handleFieldChange(index, "key", e.target.value)}
              className="border rounded px-2 py-1 w-1/3"
            />
            <input
              type="text"
              placeholder="Giá trị"
              value={item.value}
              onChange={(e) =>
                handleFieldChange(index, "value", e.target.value)
              }
              className="border rounded px-2 py-1 flex-1"
            />
            <button
              onClick={() => removeField(index)}
              className="bg-red-500 text-white px-2 rounded"
            >
              X
            </button>
          </div>
        ))}

        <button
          onClick={addField}
          className="text-blue-600 hover:underline mb-4"
        >
          + Thêm trường
        </button>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
