import { Bell, AlertTriangle, Edit3 } from "lucide-react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { useEffect } from "react";
import { motion } from "framer-motion";
import formatDate from "../../utils/formatDate";

export default function ExpiryNotification() {
  const assetLoginInfo = AssetLoginInfoStore();

  useEffect(() => {
    const fetchData = async () => {
      await assetLoginInfo.getAssetExpired();
    };
    fetchData();
  }, []);

  const assetExpired = assetLoginInfo?.data?.value?.filter(
    (item) => Number(item.so_ngay_con_lai) <= 0
  );
  const assetWarning = assetLoginInfo?.data?.value?.filter(
    (item) => Number(item.so_ngay_con_lai) <= 7
  );
  const assetUrgent = assetLoginInfo?.data?.value?.filter(
    (item) => Number(item.so_ngay_con_lai) <= 3
  );

  return (
    <div className="p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-4 flex items-center space-x-3 mb-6"
      >
        <Bell className="w-7 h-7 text-white animate-bounce" />
        <h1 className="text-2xl font-bold text-white">
          Thông Báo Hết Hạn Tài Sản
        </h1>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            count: assetExpired?.length,
            label: "Đã Hết Hạn",
            color: "red",
          },
          {
            count: assetWarning?.length,
            label: "Hết Hạn ≤ 7 Ngày",
            color: "yellow",
          },
          {
            count: assetUrgent?.length,
            label: "Hết Hạn ≤ 3 Ngày",
            color: "sky",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className={`bg-white rounded-xl shadow-lg border-t-4 border-${stat.color}-500 flex items-center p-4`}
          >
            <div className={`text-3xl mr-4 text-${stat.color}-500`}>
              <AlertTriangle />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.count}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="overflow-x-auto rounded-lg shadow-lg"
      >
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-left">
              <th className="py-3 px-4 text-center">TÀI SẢN</th>
              <th className="py-3 px-4 text-center">NGÀY HẾT HẠN</th>
              <th className="py-3 px-4 text-center">THỜI GIAN CÒN LẠI</th>
              <th className="py-3 px-4 text-center">MỨC ĐỘ</th>
              <th className="py-3 px-4 text-center">THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {assetLoginInfo?.data?.value?.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
              >
                <td className="py-3 px-4 font-semibold text-blue-800 text-center">
                  {item?.ten_tai_san}
                </td>
                <td className="py-3 px-4 text-center">
                  {formatDate(item?.ngay_thu_hoi)}
                </td>
                <td className="py-3 px-4 text-sky-500 font-semibold text-center">
                  {item?.so_ngay_con_lai}
                </td>
                <td className="py-3 px-4 text-center">
                  {Number(item.so_ngay_con_lai) <= 0 ? (
                    <span className="px-3 py-1 rounded-lg bg-red-600 text-white font-semibold animate-pulse">
                      Hết hạn
                    </span>
                  ) : Number(item.so_ngay_con_lai) <= 3 ? (
                    <span className="px-3 py-1 rounded-lg bg-red-500 text-white font-semibold animate-pulse">
                      Khẩn cấp
                    </span>
                  ) : Number(item.so_ngay_con_lai) <= 7 ? (
                    <span className="px-3 py-1 rounded-lg bg-yellow-400 text-white font-semibold">
                      Cảnh báo
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-lg bg-green-500 text-white font-semibold">
                      Bình thường
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 flex space-x-2 justify-center">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="px-3 py-1 rounded-lg bg-blue-500 text-white flex items-center space-x-1 shadow-md hover:opacity-80"
                  >
                    <Edit3 className="w-4 h-4" /> <span>Cập Nhật</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="px-3 py-1 rounded-lg bg-blue-400 text-white flex items-center space-x-1 shadow-md hover:opacity-80"
                  >
                    <Bell className="w-4 h-4" /> <span>Thông Báo</span>
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
