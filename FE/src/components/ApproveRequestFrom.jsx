import { useState } from "react";
import { X } from "lucide-react";
import { AssetLoginInfoStore } from "../stores/assetLoginInfo";
import { AssetRequestStore } from "../stores/assetRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { NotificationStore } from "../stores/notification"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ApproveRequestFrom({ setIsModalOpen, data }) {
  const assetLoginInfo = AssetLoginInfoStore();
  const assetRequest = AssetRequestStore();
  const notification = NotificationStore();
  const navigate = useNavigate();

  const defaultFields = [
    { key: "Email", value: "" },
    { key: "Username", value: "" },
    { key: "Password", value: "" },
  ];

  const [customFields, setCustomFields] = useState(defaultFields);
  const [revokeDate, setRevokeDate] = useState("");

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
    setCustomFields(defaultFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customData = {};
    customFields.forEach(({ key, value }) => {
      if (key.trim()) customData[key] = value;
    });

    const payload = {
      TaiSanId: data?.tai_san_id,
      nguoi_dai_dien_id: data?.nguoi_yeu_cau_id,
      nguoi_nhan_id: data?.nguoi_nhan_id,
      thong_tin: customData,
      ngay_thu_hoi: revokeDate,
    };
    console.log("Payload to submit:", payload);

    const respone = await assetLoginInfo.createAssetLoginInfo(payload);
    if (respone.status == true) {
      toast.success("Yêu cầu được chấp nhận ");
    }
    const response = await assetRequest.updateStatusAssetRequest(
      data.yeu_cau_id,
      { trang_thai: "đã duyệt" }
    );

    if (response.status === true) {
      toast.success("Chấp nhận phê duyệt");
      setIsModalOpen(false);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  return (
    <Dialog open={true} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Thông tin cấp tài sản</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Tài sản */}
          <div>
            <Label className="mb-1 block">Tên tài sản</Label>
            <Input value={data?.ten_tai_san} readOnly />
          </div>

          {/* Người yêu cầu */}
          <div>
            <Label className="mb-1 block">Tên người yêu cầu</Label>
            <Input value={data?.nguoi_yeu_cau} readOnly />
          </div>

          {/* Người nhận */}
          <div>
            <Label className="mb-1 block">Tên người nhận</Label>
            <Input value={data?.nguoi_nhan} readOnly />
          </div>

          {/* ✅ Ngày + giờ thu hồi */}
          <div className="w-1/3 ">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày thu hồi
            </label>
            <input
              type="datetime-local"
              value={revokeDate}
              onChange={(e) => setRevokeDate(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Custom fields */}
          <div className="border rounded-lg p-3 space-y-2">
            <div className="flex justify-between items-center">
              <Label className="font-semibold">
                Thông tin đăng nhập cấp phát
              </Label>
              <div className="space-x-3 text-sm">
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-600 p-0 h-auto"
                  onClick={handleAddField}
                >
                  + Thêm trường
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="text-gray-600 p-0 h-auto"
                  onClick={handleResetDefault}
                >
                  ↺ Reset mặc định
                </Button>
              </div>
            </div>

            <ScrollArea className="max-h-[200px] pr-2">
              <div className="space-y-2">
                {customFields.map((field, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      placeholder="Tên thuộc tính"
                      value={field.key}
                      onChange={(e) =>
                        handleChangeField(index, "key", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Giá trị"
                      value={field.value}
                      onChange={(e) =>
                        handleChangeField(index, "value", e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveField(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Actions */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Hủy
            </Button>
            <Button type="submit">Tạo tài sản</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
