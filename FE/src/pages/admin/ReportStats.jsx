import { useEffect, useState, useMemo } from "react";
import { UserStore } from "../../stores/tai_khoan";
import { AssetStore } from "../../stores/asset";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { toast } from "react-toastify";

export default function ReportStats() {
  const allUsers = UserStore((state) => state.data) || [];
  const allAssets = AssetStore((state) => state.data) || [];
  const { createAssetLoginInfo } = AssetLoginInfoStore();
  const { findforLevel2 } = UserStore();
  const { getAllAsset } = AssetStore();

  // State cho các giá trị được chọn trong dropdown
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const [employeesInDepartment, setEmployeesInDepartment] = useState([]);

  const defaultFields = [
    { key: "Email", value: "" },
    { key: "Username", value: "" },
    { key: "Password", value: "" },
  ];
  const [customFields, setCustomFields] = useState(defaultFields);

  // Chỉ gọi API để lấy dữ liệu khi component được tạo lần đầu
  useEffect(() => {
    findforLevel2();
    getAllAsset();
  }, [findforLevel2, getAllAsset]);

  // Lọc danh sách quản lý (cap: 2) từ dữ liệu store
  // useMemo giúp tối ưu, chỉ tính toán lại khi allUsers thay đổi
  const managers = useMemo(() => {
    return allUsers.filter((user) => user.cap === 2);
  }, [allUsers]);

  // Lọc nhân viên khi chọn một quản lý
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

  // Các hàm xử lý cho form
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

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssetId || !selectedManagerId || !selectedEmployeeId) {
      alert("Vui lòng chọn đầy đủ thông tin tài sản, quản lý và nhân viên.");
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
    };
    const response = await createAssetLoginInfo(payload);
    if (response.status === true) {
      toast.success("Cấp phát tài sản thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Cấp phát tài sản trực tiếp
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Dropdown Tài sản */}
          <div className="bg-white p-4 rounded-lg shadow">
            <label
              htmlFor="asset-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Chọn Tài sản
            </label>
            <select
              id="asset-select"
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Vui lòng chọn một tài sản --</option>
              {allAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.ten_tai_san}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Người quản lý */}
          <div className="bg-white p-4 rounded-lg shadow">
            <label
              htmlFor="manager-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Chọn Quản lý Phòng ban
            </label>
            <select
              id="manager-select"
              value={selectedManagerId}
              onChange={(e) => setSelectedManagerId(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Vui lòng chọn một quản lý --</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.ho_ten} ({manager.ten})
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Nhân viên */}
          <div className="bg-white p-4 rounded-lg shadow">
            <label
              htmlFor="employee-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Chọn Nhân viên
            </label>
            <select
              id="employee-select"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={!selectedManagerId}
            >
              <option value="">-- Vui lòng chọn một nhân viên --</option>
              {employeesInDepartment.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.ho_ten}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom fields */}
        <div className="border rounded-lg p-4 bg-white shadow">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-lg font-semibold text-gray-800">
              Thông tin đăng nhập cấp phát
            </label>
            <div className="space-x-3">
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
          <div className="max-h-[200px] overflow-y-auto pr-2 space-y-3">
            {customFields.map((field, index) => (
              <div key={index} className="flex items-center space-x-3">
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
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Cấp phát tài sản
          </button>
        </div>
      </form>
    </div>
  );
}
