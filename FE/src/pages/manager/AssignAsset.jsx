import { useEffect, useState } from "react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { AssetRequestStore } from "../../stores/assetRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AssetStore } from "../../stores/asset";
import { DepartmentStore } from "../../stores/department";
import { NotificationStore } from "../../stores/notification";
import { useAuth } from "@/context/AuthContext";

export default function AssignAsset() {
  const [allAsset, setAllAsset] = useState();
  const [allUserDepartment, setAllUserDepartment] = useState();
  const assetLoginInfo = AssetLoginInfoStore();
  const notification = NotificationStore();
  const assetStore = AssetStore();
  const navigate = useNavigate();
  const department = DepartmentStore();
  const { user } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [customFields, setCustomFields] = useState([
    { key: "Email", value: "" },
    { key: "Username", value: "" },
    { key: "Password", value: "" },
  ]);
  const [revokeDate, setRevokeDate] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const allAssets = await assetStore.getAllAsset();
        setAllAsset(allAssets);
        const userInDepartment = await department.getUserByDepartment();
        setAllUserDepartment(userInDepartment);
      } catch (error) {
        console.error("❌ Lỗi khi load assets:", error);
      }
    };
    fetchAssets();
  }, []);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(Number(e.target.value));
  };

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
    setCustomFields([
      { key: "Email", value: "" },
      { key: "Username", value: "" },
      { key: "Password", value: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customData = {};
    customFields.forEach(({ key, value }) => {
      if (key.trim()) customData[key] = value;
    });

    const payload = {
      TaiSanId: selectedAssetId,
      nguoi_dai_dien_id: user?.id,
      nguoi_nhan_id: selectedEmployee,
      thong_tin: customData,
      ngay_thu_hoi: revokeDate,
    };
    console.log("Payload to submit:", payload);
    // const selectedAsset = allAssets.find(
    //   (asset) => asset.id === parseInt(selectedAssetId)
    // );
    const response = await assetLoginInfo.createAssetLoginInfo(payload);
    console.log(response)
    if (response.status == true) {
      const refreshed = await assetLoginInfo.getAssetLoginInfoPrivate();

      // 📝 Chuyển dữ liệu API thành format mà bảng bạn đang dùng
      const data = refreshed?.value?.map((item) => ({
        id: item.id,
        name: `${item.ten_tai_san} - ${item.ho_ten_nguoi_nhan}`,
        username: item.ten_dang_nhap,
        password: item.mat_khau,
        department: item.ten_phong_ban,
        provider: item.ten_nha_cung_cap,
        ngay_cap: item.ngay_cap,
        ngay_thu_hoi: item.ngay_thu_hoi,
        so_ngay_con_lai: item.so_ngay_con_lai,
      }));

      // ✅ Cập nhật lại state hiển thị
      setAllAsset(data);
      toast.success("Cấp phát tài sản thành công");
      await notification.createNotification({
        noi_dung:
          "Bạn đã được cấp phát tài sản " +
          allAsset.find((ts) => ts.id == selectedAssetId)?.ten_tai_san,
        TaiKhoanId: selectedEmployee,
      });
      setSelectedAssetId("");
      setSelectedEmployee("");
      setRevokeDate("");
      setCustomFields([
        { key: "Email", value: "" },
        { key: "Username", value: "" },
        { key: "Password", value: "" },
      ]);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Cấp phát tài sản cho nhân viên
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-3 space-y-2"
      >
        {/* Tên tài sản - Select */}
        <div>
          <label className="block text-sm font-medium mb-1">Tên tài sản</label>
          <select
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            required
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Chọn tài sản --</option>
            {allAsset?.map((ts, index) => (
              <option key={index} value={ts?.id}>
                {ts?.ten_tai_san}
              </option>
            ))}
          </select>
        </div>

        {/* Người yêu cầu */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Người yêu cầu
          </label>
          <input
            type="text"
            value={user?.ho_ten || ""}
            readOnly
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Người nhận */}
        <div>
          <label className="block text-sm font-medium mb-1">Người nhận</label>
          <select
            value={selectedEmployee}
            onChange={handleEmployeeChange}
            required
            className="w-full border rounded-lg p-2"
          >
            <option value="">-- Chọn nhân viên --</option>
            {allUserDepartment?.map((nv, index) => (
              <option key={index} value={nv?.id}>
                {nv?.ho_ten}
              </option>
            ))}
          </select>
        </div>

        {/* Ngày thu hồi */}
        <div>
          <label className="block text-sm font-medium mb-1">Ngày thu hồi</label>
          <input
            type="datetime-local"
            value={revokeDate}
            onChange={(e) => setRevokeDate(e.target.value)}
            required
            className="w-1/3 border rounded-lg p-2"
          />
        </div>

        {/* Custom fields */}
        <div className="border rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">
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

          <div className="space-y-2 overflow-y-auto h-[180px]">
            {customFields.map((field, index) => (
              <div key={index} className="flex space-x-2">
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
                  className="px-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tạo tài sản
          </button>
        </div>
      </form>
    </div>
  );
}