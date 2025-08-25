import { Bell, AlertTriangle, Edit3 } from "lucide-react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { useEffect } from "react";
import formatDate from "../../utils/formatDate";

export default function ExpiryNotification() {
  const assetLoginInfo = AssetLoginInfoStore();

  useEffect(() => {
    const fetchData = async () => {
      await assetLoginInfo.getAssetExpired();
    };
    fetchData();
  }, []);
  console.log(assetLoginInfo?.data?.value);

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
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-t-4 border-purple-500 p-4 flex items-center space-x-2 mb-6">
        <Bell className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl font-bold">Thông Báo Hết Hạn</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          className={`bg-white rounded-lg shadow p-4 border-l-4 border-red-500 flex items-center`}
        >
          <div className={`text-3xl mr-4 text-red-500`}>
            <AlertTriangle />
          </div>
          <div>
            <div className="text-2xl font-bold">{assetExpired?.length}</div>
            <div className="text-gray-600">Đã Hết Hạn</div>
          </div>
        </div>
        <div
          className={`bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500 flex items-center`}
        >
          <div className={`text-3xl mr-4 text-yellow-500`}>
            <AlertTriangle />
          </div>
          <div>
            <div className="text-2xl font-bold">{assetWarning?.length}</div>
            <div className="text-gray-600">Hết Hạn ≤ 7 Ngày</div>
          </div>
        </div>
        <div
          className={`bg-white rounded-lg shadow p-4 border-l-4 border-sky-500 flex items-center`}
        >
          <div className={`text-3xl mr-4 text-sky-500`}>
            <AlertTriangle />
          </div>
          <div>
            <div className="text-2xl font-bold">{assetUrgent?.length}</div>
            <div className="text-gray-600">Hết Hạn ≤ 3 Ngày</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-left">
              <th className="py-3 px-4 text-center">TÀI SẢN</th>
              <th className="py-3 px-4 text-center">NGÀY HẾT HẠN</th>
              <th className="py-3 px-4 text-center">THỜI GIAN CÒN LẠI</th>
              <th className="py-3 px-4 text-center">MỨC ĐỘ</th>
              <th className="py-3 px-4 text-center">THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {assetLoginInfo?.data?.value?.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="py-3 px-4 font-semibold text-blue-800 text-center">
                  {item?.ten_tai_san}
                </td>
                <td className="py-3 px-4 text-center">
                  {formatDate(item?.ngay_thu_hoi)}
                </td>
                <td className="py-3 px-4 text-sky-500 text-center">
                  {item?.so_ngay_con_lai}
                </td>
                <td className="py-3 px-4 text-center">
                  {Number(item.so_ngay_con_lai) <= 0 ? (
                    <span className="px-2 py-1 rounded bg-red-600 text-white font-semibold">
                      Hết hạn
                    </span>
                  ) : Number(item.so_ngay_con_lai) <= 3 ? (
                    <span className="px-2 py-1 rounded bg-red-500 text-white font-semibold">
                      Khẩn cấp
                    </span>
                  ) : Number(item.so_ngay_con_lai) <= 7 ? (
                    <span className="px-2 py-1 rounded bg-yellow-400 text-white font-semibold">
                      Cảnh báo
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded bg-green-500 text-white font-semibold">
                      Bình thường
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 flex space-x-2 text-center justify-center">
                  <button className=" cursor-pointer hover:opacity-60 px-3 py-1 rounded bg-gradient-to-r from-pink-400 to-yellow-400 text-white flex items-center space-x-1">
                    <Edit3 className="w-4 h-4" /> <span>Cập Nhật</span>
                  </button>
                  <button className="cursor-pointer hover:opacity-60 px-3 py-1 rounded bg-gradient-to-r from-sky-400 to-sky-600 text-white flex items-center space-x-1">
                    <Bell className="w-4 h-4" /> <span>Thông Báo</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
