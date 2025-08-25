import React, { useEffect, useState } from 'react';
import { ClipboardCheck, Check, X, Package, User, Calendar, FileText, Building2, UserCheck } from "lucide-react";
import { AssetRequestStore } from "../../stores/assetRequest";
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

// Helper function for status colors
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
  const assetRequest = AssetRequestStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
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

  const handleRejectSubmit = async (id) => {
    if (!rejectReason.trim()) {
      alert("Vui lòng nhập lý do từ chối!");
      return;
    }

    try {
      await assetRequest.updateStatusAssetRequest(id, {
        trang_thai: "từ chối",
        ly_do_tu_choi: rejectReason,
      });

      setIsRejectModalOpen(false);
      setRejectReason("");
      setSelectedRequest(null);
      await assetRequest.getAllAssetRequest();
    } catch (error) {
      console.error("❌ Lỗi khi từ chối yêu cầu:", error);
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
          pendingRequest.map((item, index) => (
            <Card key={item.yeu_cau_id || index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white py-0 ">
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

              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Thông tin chính */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="text-lg text-gray-500">Bộ phận yêu cầu</span>
                            <p className="font-semibold text-gray-800">{item?.ten || "Không rõ"}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="text-lg text-gray-500">Người yêu cầu</span>
                            <p className="font-semibold text-gray-800">{item?.nguoi_yeu_cau || "Không rõ"}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <UserCheck className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="text-lg text-gray-500">Mã người nhận</span>
                            <p className="font-semibold text-gray-800">{item?.nguoi_yeu_cau_id || "Không rõ"}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <span className="text-lg text-gray-500">Danh mục tài sản</span>
                          <div className="mt-1">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {item?.ten_danh_muc_tai_san || "Tài sản mới"}
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <span className="text-lg text-gray-500">Loại yêu cầu</span>
                          <p className="font-semibold text-gray-800">{item?.loai || "Không rõ"}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="text-lg text-gray-500">Ngày yêu cầu</span>
                            <p className="font-semibold text-gray-800">{formatDate(item?.ngay_yeu_cau)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-start space-x-2">
                        <FileText className="w-4 h-4 text-gray-500 mt-1" />
                        <div className="flex-1">
                          <span className="text-lg text-gray-500">Lý do yêu cầu</span>
                          <p className="font-medium text-gray-800 mt-1 leading-relaxed">
                            {item?.noi_dung || "Không có mô tả"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-center space-y-3">
                    <div className="text-center mb-2">
                      <span className="text-lg text-gray-500">Thao tác</span>
                    </div>

                    <Button
                      onClick={() => {
                        setSelectedRequest(item);
                        setIsModalOpen(true);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 transition-colors duration-200"
                      size="default"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Phê Duyệt
                    </Button>

                    <Button
                      onClick={() => {
                        setSelectedRequest(item);
                        setIsRejectModalOpen(true);
                      }}
                      variant="destructive"
                      className="w-full font-medium py-2.5 transition-colors duration-200"
                      size="default"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Từ Chối
                    </Button>
                  </div>
                </div>
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
          onSuccess={() => {
            handleCloseModals();
            assetRequest.getAllAssetRequest();
          }}
        />
      )}

      {/* Reject Dialog */}
      <Dialog open={isRejectModalOpen} onOpenChange={(open) => {
        if (!open) {
          handleCloseModals();
        }
      }}>
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