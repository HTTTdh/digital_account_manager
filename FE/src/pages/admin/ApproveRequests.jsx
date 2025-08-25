import { ClipboardCheck, Check, X } from "lucide-react";
import { AssetRequestStore } from "../../stores/assetRequest";
import { useEffect, useState } from "react";
import ApproveRequestFrom from "../../components/ApproveRequestFrom";
import { formatDateTime } from "../../utils/formatDate";
import { NotificationStore } from "../../stores/notification";
import { toast } from "react-toastify";

export default function ApproveRequests() {
  const assetRequest = AssetRequestStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const notification = NotificationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await assetRequest.getAllAssetRequest();
      } catch (error) {
        console.error("❌ Lỗi khi load requests:", error);
      }
    };
    fetchData();
  }, []);

  const pendingRequest = assetRequest?.data?.yeu_cau?.filter(
    (item) => item.trang_thai === "đang chờ duyệt"
  );

  const handleRejectSubmit = async (id) => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối!");
      return;
    }
    const response = await assetRequest.updateStatusAssetRequest(id, {
      trang_thai: "từ chối",
      ly_do_tu_choi: rejectReason,
    });

    if (response.status == true) {
      toast.success("Từ chối phê duyệt ");
      await notification.createNotification({
        noi_dung: `Yêu cầu cấp phát tài sản ${selectedRequest?.ten_tai_san} của bạn đã bị từ chối. Lý do: ${rejectReason}`,
        TaiKhoanId: selectedRequest?.nguoi_nhan_id,
      });
    }

    console.log(response);

    setIsRejectModalOpen(false);
    setRejectReason("");
  };

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-t-4 border-purple-500 p-4 flex items-center space-x-2 mb-6">
        <ClipboardCheck className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl font-bold">Phê Duyệt Yêu Cầu</h1>
      </div>

      <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
        {pendingRequest?.length === 0 ? (
          <p className="text-gray-500 text-center">Chưa có yêu cầu nào</p>
        ) : (
          pendingRequest?.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex justify-between items-start"
            >
              <div>
                <div className="font-bold text-lg">{item?.ten_tai_san}</div>
                <p>
                  <span className="font-semibold">Bộ phận yêu cầu:</span>{" "}
                  {item?.ten || "Không rõ"}
                </p>
                <p>
                  <span className="font-semibold">Người yêu cầu:</span>{" "}
                  {item?.nguoi_yeu_cau || "Không rõ"}
                </p>
                <p>
                  <span className="font-semibold">Người nhận:</span>{" "}
                  {item?.nguoi_nhan || "Không rõ"}
                </p>
                <p>
                  <span className="font-semibold">Danh mục tài sản:</span>{" "}
                  <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
                    {item?.ten_danh_muc_tai_san || "Tài sản mới"}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Ghi chú:</span>{" "}
                  {item?.noi_dung}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Ngày yêu cầu: {formatDateTime(item?.ngay_yeu_cau)}
                </p>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`${
                    item?.trang_thai === "đang chờ duyệt"
                      ? "bg-yellow-500"
                      : item?.trang_thai === "đã duyệt"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } text-white text-xs px-3 py-1 rounded-full`}
                >
                  {item?.trang_thai}
                </span>

                <div className="flex space-x-3 mt-2">
                  <button
                    onClick={() => {
                      setSelectedRequest(item);
                      setIsModalOpen(true);
                    }}
                    className="cursor-pointer flex items-center gap-1 px-1.5 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 shadow-md transition"
                  >
                    <Check className="w-4 h-4" />
                    <span>Phê Duyệt</span>
                  </button>
                  {isModalOpen && (
                    <ApproveRequestFrom
                      data={selectedRequest}
                      setIsModalOpen={setIsModalOpen}
                    />
                  )}
                  <button
                    onClick={() => {
                      setSelectedRequest(item);
                      setIsRejectModalOpen(true);
                    }}
                    className="cursor-pointer flex items-center gap-1 px-1.5 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-md transition"
                  >
                    <X className="w-4 h-4" />
                    <span>Từ Chối</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
            <button
              onClick={() => setIsRejectModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Nhập lý do từ chối
            </h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 border rounded mb-4"
              rows={4}
              placeholder="Ví dụ: Không đủ ngân sách, không phù hợp nhu cầu..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer "
              >
                Hủy
              </button>
              <button
                onClick={() => handleRejectSubmit(selectedRequest?.yeu_cau_id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
