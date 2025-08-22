import { ClipboardCheck, Check, X } from "lucide-react";
import { AssetRequestStore } from "../../stores/assetRequest";
import { useEffect, useState } from "react";
import ApproveRequestFrom from "../../components/ApproveRequestFrom";
import formatDate from "@/utils/formatDate";
import {
  Button,
} from "@/components/ui/button";
import {
  Badge,
} from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ApproveRequests() {
  const assetRequest = AssetRequestStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState([]);

  // Modal từ chối
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

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

  // ✅ Hàm xử lý từ chối
  const handleRejectSubmit = async (id) => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối!");
      return;
    }
    await assetRequest.updateStatusAssetRequest(id, {
      trang_thai: "từ chối",
      ly_do_tu_choi: rejectReason,
    });

    setIsRejectModalOpen(false);
    setRejectReason("");
    await assetRequest.getAllAssetRequest();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-t-4 border-blue-500 p-4 flex items-center space-x-2 mb-6">
        <ClipboardCheck className="w-6 h-6 text-blue-600" />
        <h1 className="text-xl font-bold">Phê Duyệt Yêu Cầu</h1>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {pendingRequest?.length === 0 ? (
          <p className="text-gray-500 text-center">Chưa có yêu cầu nào</p>
        ) : (
          pendingRequest?.map((item, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader>
                <CardTitle>{item?.ten_tai_san}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-start">
                {/* Left Info */}
                <div className="space-y-1">
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
                    {item?.nguoi_yeu_cau_id || "Không rõ"}</p>
                  <p>
                    <span className="font-semibold">Danh mục tài sản:</span>{" "}
                    <Badge variant="secondary">
                      {item?.ten_danh_muc_tai_san || "Tài sản mới"}
                    </Badge>
                  </p>
                  <p>
                    <span className="font-semibold">Loại yêu cầu:</span>{" "}
                    {item?.loai || "Không rõ"}
                  </p>
                  <p>
                    <span className="font-semibold">Lý do:</span> {item?.noi_dung}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Ngày yêu cầu:{" "}
                    {formatDate(item?.ngay_yeu_cau)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end space-y-2">
                  <Badge
                    className="capitalize"
                    variant={
                      item.trang_thai === "đang chờ duyệt"
                        ? "secondary"
                        : item.trang_thai === "đã duyệt"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {item.trang_thai}
                  </Badge>

                  <div className="flex space-x-2 mt-2">
                    <Button
                      onClick={() => {
                        setSelectedRequest(item);
                        setIsModalOpen(true);
                      }}
                      variant="success"
                      size="sm"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Phê Duyệt
                    </Button>
                    {isModalOpen && (
                      <ApproveRequestFrom
                        data={selectedRequest}
                        setIsModalOpen={setIsModalOpen}
                      />
                    )}
                    <Button
                      onClick={() => {
                        setSelectedRequest(item);
                        setIsRejectModalOpen(true);
                      }}
                      variant="destructive"
                      size="sm"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Từ Chối
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Reject Dialog */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nhập lý do từ chối</DialogTitle>
          </DialogHeader>
          <Textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={4}
            placeholder="Ví dụ: Không đủ ngân sách, không phù hợp nhu cầu..."
          />
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsRejectModalOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleRejectSubmit(selectedRequest?.yeu_cau_id)}
            >
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
