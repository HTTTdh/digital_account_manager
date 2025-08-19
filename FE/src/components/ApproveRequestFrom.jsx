import { useState } from "react";
import { X } from "lucide-react";
import { AssetLoginInfoStore } from "../stores/assetLoginInfo";
import { AssetRequestStore } from "../stores/assetRequest";
import { toast } from "react-toastify";

export default function ApproveRequestFrom({ setIsModalOpen, onSubmit, data }) {
  const assetLoginInfo = AssetLoginInfoStore();
  const assetRequest = AssetRequestStore();
  const [customFields, setCustomFields] = useState([{ key: "", value: "" }]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customData = {};
    customFields.forEach(({ key, value }) => {
      if (key.trim()) customData[key] = value;
    });
    // setIsModalOpen(false);
    const payload = {
      TaiSanId: data?.tai_san_id,
      nguoi_dai_dien_id: data?.nguoi_dai_dien_id,
      nguoi_nhan_id: data?.nguoi_nhan_id,
      thong_tin: customData,
    };
    const createInfoAsset = await assetLoginInfo.createAssetLoginInfo(payload);
    console.log(createInfoAsset);

    const response = await assetRequest.updateStatusAssetRequest(
      data.yeu_cau_id,
      {
        trang_thai: "đã duyệt",
      }
    );

    if (response.status == true) {
      toast.success("Chấp nhận phê duyệt");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  // console.log(data);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0  bg-opacity-50"
        onClick={() => setIsModalOpen(false)}
      ></div>

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg p-6 w-[500px] shadow-lg z-10"
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Thông tin tùy biến</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            value={data?.ten_nha_cung_cap}
            placeholder="Tên tài sản"
            className="w-full border rounded p-2"
          />
          <input
            name="representative"
            type="string"
            value={data?.nguoi_yeu_cau}
            className="w-full border rounded p-2"
          />
          <input
            name="receiver"
            value={data?.nguoi_nhan}
            type="string"
            className="w-full border rounded p-2"
          />
          <div className="border rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold">Danh sách thuộc tính</label>
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
