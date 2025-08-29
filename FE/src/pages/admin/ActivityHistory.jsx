import React, { useEffect, useState } from "react";
import { History, LogIn, CheckCircle, AlertTriangle, Play, Square, Clock, User, Calendar } from "lucide-react";
import { activityHistory } from "../../stores/activityHistory";
import { DepartmentStore } from "../../stores/department";
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
import { Badge } from "@/components/ui/badge";

const config = {
  color: "bg-blue-500",
  bgColor: "bg-blue-50",
  textColor: "text-blue-700"
};

const formatDateTime = (dateString) => {
  if (!dateString) return "Không xác định";
  return new Date(dateString).toLocaleString("vi-VN", {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export default function ActivityHistory() {
  const departmentStore = DepartmentStore();
  const { getAllHistory } = activityHistory();
  const [phong_ban, setPhongBan] = useState([]);
  const [filters, setFilters] = useState({
    userId: "",
    phongBanId: "all",
    startDate: "",
    endDate: "",
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async (useFilter = false) => {
    setLoading(true);
    setError("");
    try {
      let processedFilters = { ...filters };
      if (processedFilters.phongBanId === "all") {
        processedFilters.phongBanId = "";
      }
      console.log("Applying Filters:", processedFilters);

      // gửi kèm page
      const res = await getAllHistory(
        useFilter ? processedFilters : {},
        page
      );

      const data_phongban = await departmentStore.getAllDepartment();
      setPhongBan(data_phongban || []);
      // total_count BE trả về trong res[0]?.total_count
      setTotalPages(Math.ceil((res?.[0]?.total_count || 0) / 20));
      setActivities(res || []);
    } catch (e) {
      setError("Không thể tải dữ liệu");
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  };


  const clearFilters = () => {
    setFilters({
      userId: "",
      phongBanId: "all", // Changed from "" to "all"
      startDate: "",
      endDate: "",
    });
  };

  useEffect(() => {
    setPage(1); // reset về trang đầu
    fetchData(true);
  }, [filters]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 mb-6 text-white shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Lịch Sử Hoạt Động</h1>
            <p className="text-blue-100 mt-1">Theo dõi các hoạt động của hệ thống</p>
          </div>
        </div>
      </div>

      {/* Bộ lọc */}
      <Card className="mb-6 shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Bộ lọc
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phòng ban</label>
              <Select
                onValueChange={(val) => handleChange("phongBanId", val)}
                value={filters.phongBanId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả phòng ban</SelectItem>
                  {phong_ban.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id.toString()}>
                      {opt.ten}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Từ ngày</label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Đến ngày</label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setPage(1);
                  fetchData(true);
                }}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Đang lọc..." : "Lọc"}
              </Button>
              <Button
                variant="outline"
                onClick={clearFilters}
              >
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Timeline */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">Timeline Hoạt Động</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-pulse text-gray-500">Đang tải dữ liệu...</div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-500 font-medium">{error}</p>
              </div>
            ) : activities.length === 0 ? (
              <div className="text-center py-12">
                <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Không có dữ liệu hoạt động</p>
                <p className="text-gray-400 text-sm">Thử điều chỉnh bộ lọc để xem kết quả khác</p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {activities.map((act, index) => {
                  const isLast = index === activities.length - 1;

                  return (
                    <div key={`${act.hanh_dong_id}-${index}`} className="relative mb-8 pl-16">
                      {/* Content card */}
                      < Card className={`${config.bgColor} border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <Badge
                                className={`${config.color} text-white border-0 px-4 py-2 text-lg font-bold rounded-lg`}>
                                {act.loai_hanh_dong}
                              </Badge>

                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* User Info */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-lg">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-gray-700">Thông tin người dùng</span>
                              </div>
                              <div className="bg-white/60 p-3 rounded-lg space-y-2">
                                <p className="text-md">
                                  <span className="font-semibold text-gray-700">Họ tên:</span>{" "}
                                  <span className="text-gray-900">{act.tai_khoan_ho_ten || "Không xác định"}</span>
                                </p>
                                <p className="text-md">
                                  <span className="font-semibold text-gray-700">Username:</span>{" "}
                                  <span className="text-gray-900">@{act.tai_khoan_username || "unknown"}</span>
                                </p>
                              </div>
                            </div>

                            {/* Time Info */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-lg">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-gray-700">Thời gian</span>
                              </div>
                              <div className="bg-white/60 p-3 rounded-lg space-y-3">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <Play className="w-3 h-3 text-green-600" />
                                    <span className="text-md font-medium text-green-700">START</span>
                                  </div>
                                  <div className="text-md text-gray-900">
                                    {formatDateTime(act.thoi_diem_dang_nhap)}
                                  </div>
                                </div>
                                <div className="h-px bg-gray-200"></div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <Square className="w-3 h-3 text-red-600" />
                                    <span className="text-md font-medium text-red-700">END</span>
                                  </div>
                                  <div className="text-md text-gray-900">
                                    {formatDateTime(act.thoi_gian_thuc_hien)}
                                  </div>
                                </div>
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                  <div className="text-xs text-gray-600">
                                    <span className="font-medium">Thời lượng:</span>{" "}
                                    {act.thoi_diem_dang_nhap && act.thoi_gian_thuc_hien
                                      ? `${Math.round((new Date(act.thoi_gian_thuc_hien) - new Date(act.thoi_diem_dang_nhap)) / 1000)} giây`
                                      : "Không xác định"
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card >
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div >
  );
}