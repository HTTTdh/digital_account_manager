import React, { useEffect, useState } from 'react';
import { ClipboardCheck, Package } from "lucide-react";
import { AssetRequestStore } from "../../stores/assetRequest";
import ApproveRequestFrom from "../../components/ApproveRequestFrom";
import RequestInfo from '@/components/RequestInfo';
import RequestActions from '@/components/RequestActions';
import { toast } from 'react-toastify';
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

const getStatusColor = (status) => {
  switch (status) {
    case "đang chờ duyệt":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "đã duyệt":
      return "bg-green-100 text-green-800 border-green-300";
    case "từ chối":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export default function ApproveRequests() {
  const { data, getAllAssetRequest, updateStatusAssetRequest } = AssetRequestStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await getAllAssetRequest();
    }
    fetchData();
  }, []);
  const pendingRequest = data?.yeu_cau?.filter(
    (item) => item.trang_thai === "đang chờ duyệt"
  );

  const handleRejectSubmit = async (id) => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối!");
      return;
    }

    try {
      const response = await updateStatusAssetRequest(id, {
        trang_thai: "từ chối",
        ly_do_tu_choi: rejectReason,
      });
      if (response.status == true) {
        toast.success("Từ chối phê duyệt ");
      }
      setIsRejectModalOpen(false);
      setRejectReason("");
      setSelectedRequest(null);
    } catch (error) {
      console.error("Lỗi khi từ chối yêu cầu:", error);
      alert("Có lỗi xảy ra khi từ chối yêu cầu!");
    }
  };

  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsRejectModalOpen(false);
    setSelectedRequest(null);
    setRejectReason("");
  };

  return (
    <div className="p-6">
      {/* Header } */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-t-4 border-blue-500 p-4 flex items-center space-x-2 mb-6">
        <ClipboardCheck className="w-8 h-8 text-blue-600" />
        <h1 className="text-xl font-bold">Phê Duyệt Yêu Cầu</h1>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {!pendingRequest || pendingRequest.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Không có yêu cầu nào đang chờ duyệt</p>
          </div>
        ) : (
          pendingRequest.map((item) => (
            <Card key={item.yeu_cau_id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white py-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex justify-between items-start pt-5">
                  <CardTitle className="text-xl font-bold text-gray-800 leading-tight">
                    <Package className="w-5 h-5 inline mr-2 text-blue-600" />
                    {item?.ten_tai_san || "Tài sản không xác định"}
                  </CardTitle>
                  <Badge
                    className={`px-3 py-1 text-sm font-medium border ${getStatusColor(item.trang_thai)}`}
                  >
                    {item.trang_thai}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RequestInfo item={item} />
                <RequestActions
                  item={item}
                  onApprove={(i) => {
                    setSelectedRequest(i);
                    setIsModalOpen(true);
                  }}
                  onReject={(i) => {
                    setSelectedRequest(i);
                    setIsRejectModalOpen(true);
                  }}
                />
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Approve Modal */}
      {isModalOpen && selectedRequest && (
        <ApproveRequestFrom
          data={selectedRequest}
          setIsModalOpen={setIsModalOpen}
          onSuccess={async () => {
            handleCloseModals();
            await getAllAssetRequest();
          }}
        />
      )}

      {/* Reject Dialog */}
      <Dialog open={isRejectModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nhập lý do từ chối</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Yêu cầu: <span className="font-semibold">{selectedRequest?.ten_tai_san}</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Người yêu cầu: <span className="font-semibold">{selectedRequest?.nguoi_yeu_cau}</span>
              </p>
            </div>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              placeholder="Ví dụ: Không đủ ngân sách, không phù hợp nhu cầu, thiếu thông tin..."
              className="resize-none"
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCloseModals}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleRejectSubmit(selectedRequest?.yeu_cau_id)}
              disabled={!rejectReason.trim()}
            >
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}