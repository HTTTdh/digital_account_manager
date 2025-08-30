import React, { useEffect, useState, useMemo } from "react";
import { UserStore } from "../../stores/tai_khoan";
import { AssetStore } from "../../stores/asset";
import { ThuongHieuStore } from "../../stores/thuonghieu";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { toast } from "react-toastify";
import { HardDrive } from "lucide-react";

import AssetCategorySelect from "../../components/AssetCategorySelect";
import AssetSelect from "../../components/AssetSelect";
import ManagerSelect from "../../components/ManagerSelect";
import EmployeeSelect from "../../components/EmployeeSelect";
import RevokeDatePicker from "../../components/RevokeDatePicker";
import ProgressSteps from "../../components/ProgressSteps";
import CustomFieldsForm from "../../components/CustomFieldsForm";
import SubmitSection from "../../components/SubmitSection";

export default function ReportStats() {
  const { createAssetLoginInfo } = AssetLoginInfoStore();
  const { dataLevel1: allUsers, findforLevel1 } = UserStore();
  const { data: allAssets, getAllAsset } = AssetStore();
  const { data: allDMAssets, getAllThuongHieu } = ThuongHieuStore();

  const [selectedDMAssetId, setSelectedDMAssetId] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [employeesInDepartment, setEmployeesInDepartment] = useState([]);
  const [assetsInCategory, setAssetsInCategory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revokeDate, setRevokeDate] = useState("");
  const defaultFields = [
    { key: "Email", value: "" },
    { key: "Username", value: "" },
    { key: "password", value: "" },
  ];
  const [customFields, setCustomFields] = useState(defaultFields);

  // managers (cap=2)
  const managers = useMemo(() => allUsers.filter((u) => u.cap === 2), [allUsers]);

  useEffect(() => {
    getAllThuongHieu();
    findforLevel1();
    getAllAsset();
  }, []);

  // lọc nhân viên theo phòng ban quản lý
  useEffect(() => {
    if (selectedManagerId) {
      const manager = allUsers.find((u) => u.id === parseInt(selectedManagerId));
      if (manager) {
        const filteredEmployees = allUsers.filter(
          (u) => u.cap === 3 && u.phong_ban_id === manager.phong_ban_id
        );
        setEmployeesInDepartment(filteredEmployees);
      }
    } else {
      setEmployeesInDepartment([]);
    }
    setSelectedEmployeeId("");
  }, [selectedManagerId, allUsers]);

  // lọc tài sản theo danh mục
  useEffect(() => {
    if (selectedDMAssetId) {
      const filtered = allAssets.filter(
        (a) => a.danh_muc_tai_san_id === parseInt(selectedDMAssetId)
      );
      setAssetsInCategory(filtered);
      setSelectedAssetId("");
    } else {
      setAssetsInCategory([]);
      setSelectedAssetId("");
    }
  }, [selectedDMAssetId, allAssets]);

  // validation
  const isFormValid =
    selectedDMAssetId && selectedAssetId && selectedManagerId && selectedEmployeeId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || !revokeDate) return;

    const customData = {};
    customFields.forEach(({ key, value }) => {
      if (key.trim()) customData[key] = value;
    });

    const payload = {
      TaiSanId: selectedAssetId,
      nguoi_dai_dien_id: selectedManagerId,
      nguoi_nhan_id: selectedEmployeeId,
      thong_tin: customData,
      ngay_thu_hoi: revokeDate,
    };

    setIsSubmitting(true);
    const response = await createAssetLoginInfo(payload);
    setIsSubmitting(false);

    if (response.status === true) {
      console.log("thanh cong")
      toast.success("Cấp phát tài sản thành công!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center space-x-4">
            <HardDrive className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Cấp phát tài sản</h1>
              <p className="text-blue-100">Quản lý và phân bổ tài sản cho nhân viên</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AssetCategorySelect
              allDMAssets={allDMAssets}
              selectedDMAssetId={selectedDMAssetId}
              setSelectedDMAssetId={setSelectedDMAssetId}
            />
            <AssetSelect
              assetsInCategory={assetsInCategory}
              selectedAssetId={selectedAssetId}
              setSelectedAssetId={setSelectedAssetId}
              disabled={!selectedDMAssetId}
            />
            <ManagerSelect
              managers={managers}
              selectedManagerId={selectedManagerId}
              setSelectedManagerId={setSelectedManagerId}
            />
            <EmployeeSelect
              employees={employeesInDepartment}
              selectedEmployeeId={selectedEmployeeId}
              setSelectedEmployeeId={setSelectedEmployeeId}
              disabled={!selectedManagerId}
            />
            <RevokeDatePicker revokeDate={revokeDate} setRevokeDate={setRevokeDate} />
          </div>

          <ProgressSteps
            selectedDMAssetId={selectedDMAssetId}
            selectedAssetId={selectedAssetId}
            selectedManagerId={selectedManagerId}
            selectedEmployeeId={selectedEmployeeId}
          />

          <CustomFieldsForm
            customFields={customFields}
            setCustomFields={setCustomFields}
            defaultFields={defaultFields}
          />

          <SubmitSection
            isFormValid={isFormValid}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
