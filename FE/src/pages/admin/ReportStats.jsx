import { useEffect, useState, useMemo } from "react";
import { UserStore } from "../../stores/tai_khoan";
import { AssetStore } from "../../stores/asset";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { NotificationStore } from "../../stores/notification";
import { toast } from "react-toastify";

export default function ReportStats() {
  const allUsers = UserStore((state) => state.data) || [];
  const allAssets = AssetStore((state) => state.data) || [];
  const { createAssetLoginInfo } = AssetLoginInfoStore();
  const { findforLevel2 } = UserStore();
  const { getAllAsset } = AssetStore();
  const notification = NotificationStore();
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [employeesInDepartment, setEmployeesInDepartment] = useState([]);

  const [revokeDate, setRevokeDate] = useState("");

  const defaultFields = [
    { key: "Email", value: "" },
    { key: "Username", value: "" },
    { key: "Password", value: "" },
  ];
  const [customFields, setCustomFields] = useState(defaultFields);

  useEffect(() => {
    findforLevel2();
    getAllAsset();
  }, [findforLevel2, getAllAsset]);

  const managers = useMemo(() => {
    return allUsers.filter((user) => user.cap === 2);
  }, [allUsers]);

  useEffect(() => {
    if (selectedManagerId) {
      const selectedManager = allUsers.find(
        (user) => user.id === parseInt(selectedManagerId)
      );
      if (selectedManager) {
        const departmentId = selectedManager.phong_ban_id;
        const filteredEmployees = allUsers.filter(
          (user) => user.cap === 3 && user.phong_ban_id === departmentId
        );
        setEmployeesInDepartment(filteredEmployees);
      }
    } else {
      setEmployeesInDepartment([]);
    }
    setSelectedEmployeeId("");
  }, [selectedManagerId, allUsers]);

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
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+07`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssetId || !selectedManagerId || !selectedEmployeeId) {
      alert("Vui lòng chọn đầy đủ thông tin tài sản, quản lý và nhân viên.");
      return;
    }
    if (!revokeDate) {
      alert("Vui lòng chọn ngày thu hồi.");
      return;
    }

    const customData = {};
    customFields.forEach(({ key, value }) => {
      if (key.trim()) customData[key] = value;
    });

    const payload = {
      TaiSanId: selectedAssetId,
      nguoi_dai_dien_id: selectedManagerId,
      nguoi_nhan_id: selectedEmployeeId,
      thong_tin: customData,
      ngay_thu_hoi: formatDateTime(revokeDate),
    };

    const selectedAsset = allAssets.find(
      (asset) => asset.id === parseInt(selectedAssetId)
    );

    const response = await createAssetLoginInfo(payload);
    if (response.status === true) {
      toast.success("Cấp phát tài sản thành công!");
      const result = await notification.createNotification({
        TaiKhoanId: selectedEmployeeId,
        noi_dung: `Bạn đã được cấp phát tài sản: ${selectedAsset?.ten_tai_san}.`,
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <div className="px-8 py-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🚀 Cấp phát tài sản trực tiếp
      </h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Grid Selects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chọn tài sản */}
          <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn Tài sản
            </label>
            <select
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 "
            >
              <option value="">-- Vui lòng chọn một tài sản --</option>
              {allAssets.map((asset) => (
                <option key={asset?.id} value={asset?.id}>
                  {asset?.ten_tai_san}
                </option>
              ))}
            </select>
          </div>

          {/* Quản lý */}
          <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn Quản lý Phòng ban
            </label>
            <select
              value={selectedManagerId}
              onChange={(e) => setSelectedManagerId(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 "
            >
              <option value="">-- Vui lòng chọn một quản lý --</option>
              {managers?.map((manager) => (
                <option key={manager?.id} value={manager?.id}>
                  {manager?.ho_ten} ({manager?.ten})
                </option>
              ))}
            </select>
          </div>

          {/* Nhân viên */}
          <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chọn Nhân viên
            </label>
            <select
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              disabled={!selectedManagerId}
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="">-- Vui lòng chọn một nhân viên --</option>
              {employeesInDepartment.map((employee) => (
                <option key={employee?.id} value={employee?.id}>
                  {employee?.ho_ten}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ngày thu hồi */}
        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày thu hồi
          </label>
          <input
            type="datetime-local"
            value={revokeDate}
            onChange={(e) => setRevokeDate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Custom fields */}
        <div className="border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Thông tin đăng nhập cấp phát
            </h2>
            <div className="space-x-4">
              <button
                type="button"
                onClick={handleAddField}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                + Thêm trường
              </button>
              <button
                type="button"
                onClick={handleResetDefault}
                className="text-gray-600 hover:underline text-sm font-medium"
              >
                ↺ Reset mặc định
              </button>
            </div>
          </div>
          <div className="h-[200px] overflow-y-auto pr-2 space-y-3">
            {customFields.map((field, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Tên thuộc tính"
                  value={field.key}
                  onChange={(e) =>
                    handleChangeField(index, "key", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Giá trị"
                  value={field.value}
                  onChange={(e) =>
                    handleChangeField(index, "value", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-xl p-3 "
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition cursor-pointer"
          >
            Cấp phát tài sản
          </button>
        </div>
      </form>
    </div>
  );
}
