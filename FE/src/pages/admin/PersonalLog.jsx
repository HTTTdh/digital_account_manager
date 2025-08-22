import { useEffect, useState } from "react";
import { Clock, User } from "lucide-react";
import { PersonalLogStore } from "../../stores/PersonalLog";

export default function PersonalLog() {
  const { getPersonalLogById } = PersonalLogStore();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const kq = await getPersonalLogById();
      setLogs(kq || []);
    };
    fetchData();
  }, [getPersonalLogById]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-xl p-4 flex items-center space-x-3">
        <User className="w-6 h-6" />
        <h1 className="text-lg font-semibold">Nhật Ký Cá Nhân</h1>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-blue-400 bg-gray-50 rounded-b-xl p-6 space-y-6 overflow-y-auto h-[600px]">
        {logs.map((log, index) => (
          <div key={index} className="relative pl-8">
            {/* Timeline Icon */}
            <div className="absolute -left-4 top-2 flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full text-white text-xs">
              <span>+</span>
            </div>

            {/* Card */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-800">
                {log.loai_hanh_dong}
              </h2>

              <p className="text-gray-600 text-sm whitespace-pre-line mt-1">
                Người thực hiện: {log.tai_khoan_ho_ten} (
                {log.tai_khoan_username}){"\n"}
                Thời điểm đăng nhập:{" "}
                {new Date(log.thoi_diem_dang_nhap).toLocaleString("vi-VN")}
              </p>

              <div className="flex items-center text-gray-500 text-xs mt-3">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(log.thoi_gian_thuc_hien).toLocaleString("vi-VN")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
