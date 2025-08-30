import React, { useEffect, useState } from "react";
import { History, AlertTriangle, Clock } from "lucide-react";
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
import UserInfo from "@/components/UserInfo";
import TimeInfo from "@/components/TimeInfo";
const config = {
  color: "bg-blue-500",
  bgColor: "bg-blue-50",
  textColor: "text-blue-700"
};

export default function ActivityHistory() {
  const { data: phong_ban, getAllDepartment } = DepartmentStore();
  const { data, getAllHistory } = activityHistory();
  const [filters, setFilters] = useState({
    userId: "",
    phongBanId: "all",
    startDate: "",
    endDate: "",
  });
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
      const res = await getAllHistory(
        useFilter ? processedFilters : {},
        page
      );
      await getAllDepartment();

      if (!res || res.length === 0) {
        setError("Không có dữ liệu hoạt động");
        setTotalPages(1);
        return; // stop ở đây, không set data cũ
      }

      setTotalPages(Math.ceil((res?.[0]?.total_count || 0) / 20));
    } catch (e) {
      setError(
        e.response?.data?.message || "Không thể tải dữ liệu"
      );
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };


  const clearFilters = () => {
    setFilters({
      userId: "",
      phongBanId: "all",
      startDate: "",
      endDate: "",
    });
  };

  useEffect(() => {
    setPage(1);
    fetchData(true);
  }, [filters, page]);

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
              <div className="text-center py-12">
                <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">{error}</p>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {data.map((act, index) => (
                  <div key={`${act.hanh_dong_id}-${index}`} className="relative mb-8 pl-16">
                    <Card className={`${config.bgColor} border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Badge
                              className={`${config.color} text-white border-0 px-4 py-2 text-lg font-bold rounded-lg`}
                            >
                              {act.loai_hanh_dong}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <UserInfo user={{ ho_ten: act.tai_khoan_ho_ten, username: act.tai_khoan_username }} />
                          <TimeInfo start={act.thoi_diem_dang_nhap} end={act.thoi_gian_thuc_hien} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
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