import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AssetLoginInfoStore } from "../stores/assetLoginInfo";
import { AssetRequestStore } from "../stores/assetRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { NotificationStore } from "../stores/notification";

export default function ApproveRequestFrom({ setIsModalOpen, onSubmit, data }) {
  const assetLoginInfo = AssetLoginInfoStore();
  const assetRequest = AssetRequestStore();
  const notification = NotificationStore();
  const navigate = useNavigate();

  const defaultFields = [
    { key: "Email", value: "" },
    { key: "Username", value: "" },
    { key: "Password", value: "" },
  ];

  const [customFields, setCustomFields] = useState(defaultFields);
  const [revokeDate, setRevokeDate] = useState("");

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
      ngay_thu_hoi: revokeDate,
    };

    await assetLoginInfo.createAssetLoginInfo(payload);
    await notification.createNotification({
      noi_dung: `Bạn đã được cấp phát tài sản ${data?.ten_tai_san}`,
      TaiKhoanId: data?.nguoi_nhan_id,
    });
    const response = await assetRequest.updateStatusAssetRequest(
      data.yeu_cau_id,
      { trang_thai: "đã duyệt" }
    );

    if (response.status === true) {
      toast.success("Chấp nhận phê duyệt");
      setIsModalOpen(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg px-6 py-4 w-[600px] relative"
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 "
        >
          <X className="w-5 h-5 cursor-pointer hover:opacity-70" />
        </button>
        <h2 className="text-xl font-bold mb-2 text-center">
          Thông tin cấp tài sản
        </h2>
        <form className="space-y-2" onSubmit={handleSubmit}>
          {/* Tên tài sản */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tài sản
            </label>
            <input
              type="text"
              value={data?.ten_tai_san}
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
              value={data?.nguoi_nhan}
              type="text"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              readOnly
            />
          </div>

          {/* ✅ Ngày + giờ thu hồi */}
          <div className="w-1/3 ">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày thu hồi
            </label>
            <input
              type="datetime-local"
              value={revokeDate}
              onChange={(e) => setRevokeDate(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
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
                    value={field?.key}
                    onChange={(e) =>
                      handleChangeField(index, "key", e.target.value)
                    }
                    className="flex-1 border rounded-lg p-2"
                  />
                  <input
                    type="text"
                    placeholder="Giá trị"
                    value={field?.value}
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

          {/* Buttons */}
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
