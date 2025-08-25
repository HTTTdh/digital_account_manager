import { useState } from "react";
import { X } from "lucide-react";
import { AssetLoginInfoStore } from "../stores/assetLoginInfo";
import { AssetRequestStore } from "../stores/assetRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ApproveRequestFrom({ setIsModalOpen, onSubmit, data }) {
  const assetLoginInfo = AssetLoginInfoStore();
  const assetRequest = AssetRequestStore();
  const navigate = useNavigate();

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
    setCustomFields(customFields.filter((_, i) => i !== index));
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
      if (key.trim()) customData[key] = value;
    });
    const payload = {
      TaiSanId: data?.tai_san_id,
      nguoi_dai_dien_id: data?.nguoi_yeu_cau_id,
      nguoi_nhan_id: data?.nguoi_nhan_id,
      thong_tin: customData,
    };
    await assetLoginInfo.createAssetLoginInfo(payload);

    const response = await assetRequest.updateStatusAssetRequest(
      data.yeu_cau_id,
      {
        trang_thai: "đã duyệt",
      }
    );

    if (response.status === true) {
      toast.success("Chấp nhận phê duyệt");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-[600px] relative"
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 "
        >
          <X className="w-5 h-5 cursor-pointer hover:opacity-70" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          Thông tin cấp tài sản
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tài sản
            </label>
            <input
              name="name"
              type="text"
              value={data?.ten_tai_san}
              placeholder="Tên tài sản"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          {/* Người yêu cầu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên người yêu cầu
            </label>
            <input
              name="representative"
              type="text"
              value={data?.nguoi_yeu_cau}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          {/* Người nhận */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên người nhận
            </label>
            <input
              name="receiver"
              value={data?.nguoi_nhan}
              type="text"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          {/* Custom fields */}
          <div className="border rounded-lg p-3 ">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Thông tin đăng nhập cấp phát
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
            <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2">
              {customFields.map((field, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    placeholder="Tên thuộc tính"
                    value={field.key}
                    onChange={(e) =>
                      handleChangeField(index, "key", e.target.value)
                    }
                    className="flex-1 border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Giá trị"
                    value={field.value}
                    onChange={(e) =>
                      handleChangeField(index, "value", e.target.value)
                    }
                    className="flex-1 border rounded-lg p-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="px-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
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
              Tạo tài sản
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
