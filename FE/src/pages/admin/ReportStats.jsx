import { useEffect, useState, useMemo } from "react";
import { UserStore } from "../../stores/tai_khoan";
import { AssetStore } from "../../stores/asset";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { toast } from "react-toastify";
import { Plus, RotateCcw, Trash2, HardDrive, Users, User } from "lucide-react";

export default function ReportStats() {
  const allUsers = UserStore((state) => state.data) || [];
  const allAssets = AssetStore((state) => state.data) || [];
  const { createAssetLoginInfo } = AssetLoginInfoStore();
  const { findforLevel2 } = UserStore();
  const { getAllAsset } = AssetStore();

  // State dropdown
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

  useEffect(() => {
    findforLevel2();
    getAllAsset();
  }, [findforLevel2, getAllAsset]);

  // Lọc quản lý (cap = 2)
  const managers = useMemo(
    () => allUsers.filter((user) => user.cap === 2),
    [allUsers]
  );

  // Lọc nhân viên theo phòng ban quản lý
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

  // Custom field handler
  const handleAddField = () =>
    setCustomFields([...customFields, { key: "", value: "" }]);
  const handleRemoveField = (index) =>
    setCustomFields(customFields.filter((_, i) => i !== index));
  const handleChangeField = (index, field, val) => {
    const newFields = [...customFields];
    newFields[index][field] = val;
    setCustomFields(newFields);
  };
  const handleResetDefault = () => setCustomFields(defaultFields);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssetId || !selectedManagerId || !selectedEmployeeId) {
      toast.error("Vui lòng chọn đầy đủ tài sản, quản lý và nhân viên!");
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
      toast.success("✅ Cấp phát tài sản thành công!");
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-blue-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-t-xl p-6 shadow flex items-center space-x-3">
        <HardDrive className="w-7 h-7" />
        <h1 className="text-2xl font-bold">Cấp phát tài sản trực tiếp</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-b-xl shadow p-6 space-y-8"
      >
        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tài sản */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-blue-600" />
              <span>Chọn Tài sản</span>
            </label>
            <select
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

          {/* Quản lý */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Chọn Quản lý Phòng ban</span>
            </label>
            <select
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

          {/* Nhân viên */}
          <div>
            <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
              <User className="w-4 h-4 text-indigo-600" />
              <span>Chọn Nhân viên</span>
            </label>
            <select
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
        <div className="border rounded-lg p-4 bg-gray-50 shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Thông tin đăng nhập cấp phát
            </h2>
            <div className="space-x-3">
              <button
                type="button"
                onClick={handleAddField}
                className="flex items-center text-blue-600 hover:underline text-sm font-medium"
              >
                <Plus className="w-4 h-4 mr-1" /> Thêm trường
              </button>
              <button
                type="button"
                onClick={handleResetDefault}
                className="flex items-center text-gray-600 hover:underline text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4 mr-1" /> Reset mặc định
              </button>
            </div>
          </div>

          <div className="max-h-[220px] overflow-y-auto pr-2 space-y-3">
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
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-500 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
          >
            🚀 Cấp phát tài sản
          </button>
        </div>
      </form>
    </div>
  );
}
