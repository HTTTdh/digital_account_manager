import { Bell, AlertTriangle, Edit3, X } from "lucide-react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { toast } from "react-toastify";

export default function ExpiryNotification() {
  const assetLoginInfo = AssetLoginInfoStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [newStatus, setNewStatus] = useState("");


  useEffect(async () => {
    await assetLoginInfo.getAssetExpired();
  }, []);
  const handleOpenModal = (asset) => {
    setSelectedAsset(asset);

    // Dùng local time thay vì UTC
    const date = new Date(asset.ngay_thu_hoi);
    const currentExpiry = date.toLocaleDateString("en-CA");

    setNewExpiryDate(currentExpiry);
    setNewStatus(asset.trang_thai);
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedAsset || !newExpiryDate) return;

    const response = await assetLoginInfo.updateAssetLoginInfo(
      selectedAsset.id,
      {
        ngay_thu_hoi: newExpiryDate,
        trang_thai: newStatus,
      }
    );
    if (response.status == true) {
      toast.success("Cập nhật thành công!");
      setIsModalOpen(false);
      setSelectedAsset(null);
      fetchData();
    } else {
      toast.error("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };
  console.log(assetLoginInfo)
  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-t-4 border-blue-500 p-4 flex items-center space-x-2 mb-6">
        <Bell className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-bold">Thông Báo Hết Hạn</h1>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-600 text-white text-left">
              <th className="py-3 px-4 text-center">TÀI SẢN</th>
              <th className="py-3 px-4 text-center">NHÀ CUNG CẤP</th>
              <th className="py-3 px-4 text-center">PHÒNG BAN</th>
              <th className="py-3 px-4 text-center">THÔNG TIN</th>
              <th className="py-3 px-4 text-center">NGÀY HẾT HẠN</th>
              <th className="py-3 px-4 text-center">THỜI GIAN CÒN LẠI</th>
              <th className="py-3 px-4 text-center">TRẠNG THÁI</th>
              <th className="py-3 px-4 text-center">THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {assetLoginInfo?.expired?.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="py-3 px-4 font-semibold text-blue-800 text-center">
                  {item?.ten_tai_san}
                </td>
                <td className="py-3 px-4 text-center">{item?.ten_nha_cung_cap}</td>
                <td className="py-3 px-4 text-center">{item?.ten_phong_ban}</td>
                <td className="py-3 px-4 text-center">
                  <div className="text-sm">
                    <div><b>Email:</b> {item?.thong_tin?.Email}</div>
                    <div><b>User:</b> {item?.thong_tin?.Username}</div>
                    <div><b>Pass:</b> {item?.thong_tin?.Password}</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  {formatDate(item?.ngay_thu_hoi)}
                </td>
                <td className="py-3 px-4 text-sky-500 text-center">
                  {item?.so_ngay_con_lai > 0
                    ? `${item?.so_ngay_con_lai} ngày`
                    : "Đã hết hạn"}
                </td>

                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${item?.trang_thai?.toLowerCase() === "đang sử dụng"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {item?.trang_thai}
                  </span>
                </td>
                <td className="py-3 px-4 flex space-x-2 text-center justify-center">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="cursor-pointer hover:opacity-60 px-3 py-1 rounded bg-blue-400 text-white flex items-center space-x-1"
                  >
                    <Edit3 className="w-4 h-4" /> <span>Cập Nhật</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {isModalOpen && selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold mb-4">
              Cập nhật cho: {selectedAsset.ten_tai_san}
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ngày hết hạn mới
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  value={newExpiryDate}
                  onChange={(e) => setNewExpiryDate(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  required
                />
              </div>
              {/* Thêm trường trạng thái */}
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Trạng thái
                </label>
                <select
                  id="status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="Đang sử dụng">Đang sử dụng</option>
                  <option value="Đã thu hồi">Đã thu hồi</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}