import { useEffect, useState } from "react";
import { Clock, User, Activity } from "lucide-react";
import { PersonalLogStore } from "../../stores/PersonalLog";
import { motion } from "framer-motion";

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
      <div className="bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-t-xl p-4 flex items-center space-x-3 shadow">
        <User className="w-6 h-6" />
        <h1 className="text-lg font-semibold">Nhật Ký Cá Nhân</h1>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-blue-400 bg-gray-50 rounded-b-xl p-6 space-y-8 overflow-y-auto h-[600px]">
        {logs.map((log, index) => (
          <motion.div
            key={index}
            className="relative pl-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Timeline Icon */}
            <div className="absolute -left-4 top-3 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 shadow text-white">
              <Activity className="w-4 h-4" />
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <h2 className="font-semibold text-gray-800 text-base">
                {log.loai_hanh_dong}
              </h2>

              <p className="text-gray-600 text-sm whitespace-pre-line mt-2">
                👤 {log.tai_khoan_ho_ten} ({log.tai_khoan_username}){"\n"}
                🔑 Đăng nhập:{" "}
                {new Date(log.thoi_diem_dang_nhap).toLocaleString("vi-VN")}
              </p>

              <div className="flex items-center text-gray-500 text-xs mt-3">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(log.thoi_gian_thuc_hien).toLocaleString("vi-VN")}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
