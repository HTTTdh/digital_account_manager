import { useEffect, useState } from "react";
import {
  History,
  LogIn,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { activityHistory } from "../../stores/activityHistory";
import { UserStore } from "../../stores/tai_khoan";

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const typeConfig = {
  login: { icon: <LogIn className="w-5 h-5" />, color: "bg-blue-500" },
  approve: { icon: <CheckCircle className="w-5 h-5" />, color: "bg-yellow-500" },
  warning: { icon: <AlertTriangle className="w-5 h-5" />, color: "bg-red-500" },
};

export default function ActivityHistory() {
  const userStore = UserStore();
  const { getAllHistory } = activityHistory();
  const [phong_ban, setPhongBan] = useState([]);
  const [filters, setFilters] = useState({
    userId: "",
    phongBanId: "",
    date: "",
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async (useFilter = false) => {
    setLoading(true);
    try {
      const res = await getAllHistory(useFilter ? filters : {});
      const data_phongban = await userStore.getPhongBan();
      setPhongBan(data_phongban.data);
      setActivities(res || []);
    } catch (e) {
      setError("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(false);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <Card className="mb-6 border-l-4 border-blue-500">
        <CardHeader className="flex flex-row items-center space-x-2">
          <History className="w-6 h-6 text-blue-600" />
          <CardTitle>Lịch Sử Hoạt Động</CardTitle>
        </CardHeader>
      </Card>

      {/* Bộ lọc */}
      <div className="flex items-center gap-4 mb-6">
        <Select
          onValueChange={(val) => handleChange("phongBanId", val)}
          value={filters.phongBanId}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn Phòng Ban" />
          </SelectTrigger>
          <SelectContent>
            {phong_ban.map((opt) => (
              <SelectItem key={opt.id} value={opt.id.toString()}>
                {opt.ten}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={filters.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="w-[200px]"
        />

        <Button onClick={() => fetchData(true)}>Lọc</Button>
      </div>

      {/* Timeline */}
      <ScrollArea className="h-[500px] rounded-md border p-4">
        {loading ? (
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : activities.length === 0 ? (
          <p className="text-gray-500">Không có dữ liệu</p>
        ) : (
          activities.map((act, index) => (
            <div key={`${act.hanh_dong_id}-${index}`} className="mb-6 relative pl-8">
              {/* Icon timeline */}
              <div
                className={`absolute left-0 top-2 flex items-center justify-center w-6 h-6 rounded-full text-white ${typeConfig[act.loai_hanh_dong]?.color || "bg-blue-500"
                  }`}
              >
                {typeConfig[act.loai_hanh_dong]?.icon || (
                  <History className="w-4 h-4" />
                )}
              </div>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-blue-600">
                      {act.loai_hanh_dong}
                    </span>
                    <p>
                      <span className="font-semibold">Người thực hiện:</span>{" "}
                      {act.tai_khoan_ho_ten} ({act.tai_khoan_username})
                    </p>
                    <p>
                      <span className="font-semibold">Thời điểm đăng nhập:</span>{" "}
                      {new Date(act.thoi_diem_dang_nhap).toLocaleString("vi-VN")}
                    </p>
                    <p>
                      <span className="font-semibold">Thời gian thực hiện:</span>{" "}
                      {new Date(act.thoi_gian_thuc_hien).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
