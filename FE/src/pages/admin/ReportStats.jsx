import React, { useEffect, useState, useMemo } from "react";
import { UserStore } from "../../stores/tai_khoan";
import { AssetStore } from "../../stores/asset";
import { CategoryStore } from "../../stores/category";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { toast } from "react-toastify";
import {
  Plus,
  RotateCcw,
  Trash2,
  HardDrive,
  Users,
  User,
  Send,
  AlertCircle,
  CheckCircle2,
  Settings,
  ArrowRight,
} from "lucide-react";

export default function ReportStats() {
  // Stores
  const allUsers = UserStore((state) => state.data) || [];
  const allAssets = AssetStore((state) => state.data) || [];
  const allDMAssets = CategoryStore((state) => state.data)?.data || [];
  const { createAssetLoginInfo } = AssetLoginInfoStore();
  const { findforLevel2 } = UserStore();
  const { getAllAsset } = AssetStore();
  const { getAllCategory } = CategoryStore();

  // State dropdown
  const [selectedDMAssetId, setSelectedDMAssetId] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [employeesInDepartment, setEmployeesInDepartment] = useState([]);
  const [assetsInCategory, setAssetsInCategory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultFields = [
    { key: "Email", value: "" },
    { key: "Username", value: "" },
    { key: "Password", value: "" },
  ];
  const [customFields, setCustomFields] = useState(defaultFields);

  // Lọc quản lý (cap = 2)
  const managers = useMemo(() => allUsers.filter((user) => user.cap === 2), [allUsers]);

  useEffect(() => {
    getAllCategory();
    findforLevel2();
    getAllAsset();
  }, [getAllCategory, findforLevel2, getAllAsset]);

  // Lọc nhân viên theo phòng ban quản lý
  useEffect(() => {
    if (selectedManagerId) {
      const manager = allUsers.find((user) => user.id === parseInt(selectedManagerId));
      if (manager) {
        const departmentId = manager.phong_ban_id;
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

  // Lọc tài sản theo danh mục
  useEffect(() => {
    if (selectedDMAssetId) {
      const filteredAssets = allAssets.filter(
        (asset) => asset.danh_muc_tai_san_id === parseInt(selectedDMAssetId)
      );
      console.log("Filtered Assets:", filteredAssets);
      setAssetsInCategory(filteredAssets);
      setSelectedAssetId("");
    } else {
      setAssetsInCategory([]);
      setSelectedAssetId("");
    }
  }, [selectedDMAssetId, allAssets]);
  // Custom field handlers
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

  // Validation
  const isFormValid =
    selectedDMAssetId && selectedAssetId && selectedManagerId && selectedEmployeeId;

  const selectedDMAsset = allDMAssets.find((dm) => dm.id === parseInt(selectedDMAssetId));
  const selectedAsset = allAssets.find((asset) => asset.id === parseInt(selectedAssetId));
  const selectedManager = allUsers.find((user) => user.id === parseInt(selectedManagerId));
  const selectedEmployee = employeesInDepartment.find(
    (emp) => emp.id === parseInt(selectedEmployeeId)
  );

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Vui lòng chọn đầy đủ tài sản, quản lý và nhân viên!");
      return;
    }

    setIsSubmitting(true);

    try {
      const customData = {};
      customFields.forEach(({ key, value }) => {
        if (key.trim()) customData[key] = value;
      });

      const payload = {
        DMTSId: selectedDMAssetId,
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

      // Reset form
      setSelectedDMAssetId("");
      setSelectedAssetId("");
      setSelectedManagerId("");
      setSelectedEmployeeId("");
      setCustomFields(defaultFields);
    } catch (error) {
      toast.error("❌ Có lỗi xảy ra khi cấp phát tài sản!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <HardDrive className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Cấp phát tài sản</h1>
                <p className="text-blue-100">Quản lý và phân bổ tài sản cho nhân viên</p>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Danh mục tài sản */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <HardDrive className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Chọn Danh mục tài sản</h3>
                  <p className="text-sm text-gray-500">Danh mục tài sản được phép cấp</p>
                </div>
              </div>
              <select
                value={selectedDMAssetId}
                onChange={(e) => setSelectedDMAssetId(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              >
                <option value="">Chọn danh mục tài sản...</option>
                {allDMAssets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.ten}
                  </option>
                ))}
              </select>
              {selectedDMAsset && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">✓ {selectedDMAsset.ten}</p>
                </div>
              )}
            </div>

            {/* Tài sản */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <HardDrive className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Chọn Tài sản</h3>
                  <p className="text-sm text-gray-500">Tài sản cần cấp phát</p>
                </div>
              </div>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                disabled={!selectedDMAssetId}
              >
                <option value="">Chọn tài sản...</option>
                {assetsInCategory.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.ten_tai_san}
                  </option>
                ))}
              </select>
              {selectedAsset && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">✓ {selectedAsset.ten_tai_san}</p>
                </div>
              )}
            </div>

            {/* Manager Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Quản lý Phòng ban</h3>
                  <p className="text-sm text-gray-500">Người đại diện phê duyệt</p>
                </div>
              </div>
              <select
                value={selectedManagerId}
                onChange={(e) => setSelectedManagerId(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
              >
                <option value="">Chọn quản lý...</option>
                {managers.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.ho_ten} ({manager.ten})
                  </option>
                ))}
              </select>
              {selectedManager && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">✓ {selectedManager.ho_ten}</p>
                </div>
              )}
            </div>

            {/* Employee Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Nhân viên</h3>
                  <p className="text-sm text-gray-500">Người nhận tài sản</p>
                </div>
              </div>
              <select
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={!selectedManagerId}
              >
                <option value="">
                  {!selectedManagerId ? "Chọn quản lý trước..." : "Chọn nhân viên..."}
                </option>
                {employeesInDepartment.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.ho_ten}
                  </option>
                ))}
              </select>
              {selectedEmployee && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700 font-medium">✓ {selectedEmployee.ho_ten}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Tiến trình cấp phát</h3>
              <span className="text-sm text-gray-500">
                {" "}
                {[selectedAssetId, selectedManagerId, selectedEmployeeId].filter(Boolean).length}/4
                bước{" "}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-2 ${selectedDMAssetId ? "text-blue-600" : "text-gray-400"
                  }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${selectedDMAssetId ? "bg-blue-600" : "bg-gray-300"
                    }`}
                ></div>
                <span className="text-sm font-medium">Danh mục tài sản</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div
                className={`flex items-center space-x-2 ${selectedAssetId ? "text-green-600" : "text-gray-400"
                  }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${selectedAssetId ? "bg-green-600" : "bg-gray-300"
                    }`}
                ></div>
                <span className="text-sm font-medium">Tài sản</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div
                className={`flex items-center space-x-2 ${selectedManagerId ? "text-blue-600" : "text-gray-400"
                  }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${selectedManagerId ? "bg-blue-600" : "bg-gray-300"
                    }`}
                ></div>
                <span className="text-sm font-medium">Quản lý</span>
              </div>{" "}
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div
                className={`flex items-center space-x-2 ${selectedEmployeeId ? "text-purple-600" : "text-gray-400"
                  }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${selectedEmployeeId ? "bg-purple-600" : "bg-gray-300"
                    }`}
                ></div>
                <span className="text-sm font-medium">Nhân viên</span>
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Custom Fields Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Settings className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Thông tin đăng nhập</h3>
                  <p className="text-sm text-gray-500">Cấu hình thông tin truy cập cho tài sản</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleAddField}
                  className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" /> Thêm trường
                </button>
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="flex items-center px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset
                </button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto space-y-4">
              {customFields.map((field, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Tên thuộc tính (VD: Email, Username...)"
                      value={field.key}
                      onChange={(e) => handleChangeField(index, "key", e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Giá trị (VD: admin@company.com...)"
                      value={field.value}
                      onChange={(e) => handleChangeField(index, "value", e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {customFields.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Chưa có trường thông tin nào</p>
                <button
                  type="button"
                  onClick={handleAddField}
                  className="mt-3 text-blue-600 hover:underline font-medium"
                >
                  Thêm trường đầu tiên
                </button>
              </div>
            )}
          </div>{" "}
          {/* Submit Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isFormValid ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-700">Sẵn sàng cấp phát</p>
                      <p className="text-sm text-gray-500">Tất cả thông tin đã được điền đầy đủ</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6 text-orange-500" />
                    <div>
                      <p className="font-semibold text-orange-700">Chưa đầy đủ thông tin</p>
                      <p className="text-sm text-gray-500">
                        Vui lòng chọn đầy đủ tài sản, quản lý và nhân viên
                      </p>
                    </div>
                  </>
                )}
              </div>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                onClick={handleSubmit}
                className={`flex items-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${isFormValid && !isSubmitting
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Đang cấp phát...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3" /> Cấp phát tài sản
                  </>
                )}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </form>
      </div>
    </div>
  );
}