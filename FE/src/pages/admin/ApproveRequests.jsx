import { ClipboardCheck, Check, X } from "lucide-react";
import { AssetRequestStore } from "../../stores/assetRequest";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApproveRequestFrom from "../../components/ApproveRequestFrom";

export default function ApproveRequests() {
  const assetRequest = AssetRequestStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await assetRequest.getAllAssetRequest();
        // console.log("📥 Dữ liệu từ backend:", response.yeu_cau);
      } catch (error) {
        console.error("❌ Lỗi khi load requests:", error);
      }
    };
    fetchData();
  }, []);

  const pendingRequest = assetRequest?.data?.yeu_cau?.filter(
    (item) => item.trang_thai === "đang chờ duyệt"
  );
  console.log(pendingRequest);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-t-4 border-purple-500 p-4 flex items-center space-x-2 mb-6">
        <ClipboardCheck className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl font-bold">Phê Duyệt Yêu Cầu</h1>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {pendingRequest?.length === 0 ? (
          <p className="text-gray-500">Chưa có yêu cầu nào</p>
        ) : (
          pendingRequest?.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex justify-between items-start"
            >
              {/* Left Info */}
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
                  <span className="font-semibold">Danh mục tài sản:</span>{" "}
                  <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
                    {item?.ten_danh_muc_tai_san || "Tài sản mới"}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Loại yêu cầu:</span>{" "}
                  {item?.loai || "Không rõ"}
                </p>
                <p>
                  <span className="font-semibold">Lý do:</span> {item?.noi_dung}
                </p>

                <p>
                  <span className="font-semibold">Ghi chú:</span>{" "}
                  <span className="italic">
                    {item.ghi_chu
                      ? Object.entries(item.ghi_chu)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(", ")
                      : "Không có"}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-2 ">
                  Ngày yêu cầu:{" "}
                  {new Date(item.ngay_yeu_cau).toLocaleDateString("vi-VN")}
                </p>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`${
                    item.trang_thai === "đang chờ duyệt"
                      ? "bg-yellow-500"
                      : item.trang_thai === "đã duyệt"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } text-white text-xs px-3 py-1 rounded-full`}
                >
                  {item.trang_thai}
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
                  <button className="cursor-pointer flex items-center gap-1 px-1.5 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-md transition">
                    <X className="w-4 h-4" />
                    <span>Từ Chối</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
