import { DollarSign, Gift } from "lucide-react";

const stats = [
  { value: "15.830.000 ₫", label: "Tổng Chi Phí Tài Sản" },
  { value: "27", label: "Tài Sản Có Chi Phí" },
  { value: "12", label: "Tài Sản Miễn Phí" },
  { value: "79%", label: "Tỷ Lệ Sử Dụng" },
];

const paidAssets = [
  {
    name: "Email Hosting - 100 accounts",
    type: "Hosting",
    cost: "2.000.000 ₫",
    payment: "Hàng năm",
  },
  {
    name: "VPS 4GB - Production Server",
    type: "Hosting",
    cost: "1.800.000 ₫",
    payment: "Hàng quý",
  },
  {
    name: "Hosting 2GB - backup server",
    type: "Hosting",
    cost: "1.500.000 ₫",
    payment: "Hàng năm",
  },
  {
    name: "Hosting Premium 1GB",
    type: "Hosting",
    cost: "1.200.000 ₫",
    payment: "Hàng năm",
  },
];

const freeAssets = [
  {
    name: "Fanpage TMEDU Facebook",
    type: "Mạng Xã Hội",
    status: "Tạm dừng",
    users: "3 người",
  },
  {
    name: "Zalo OA Bacnhabook",
    type: "Mạng Xã Hội",
    status: "Tạm dừng",
    users: "1 người",
  },
  {
    name: "YouTube Channel TMEDU",
    type: "Mạng Xã Hội",
    status: "Tạm dừng",
    users: "1 người",
  },
  {
    name: "Instagram TMEDU Official",
    type: "Mạng Xã Hội",
    status: "Tạm dừng",
    users: "2 người",
  },
];

export default function ReportStats() {
  return (
    <div className="p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-4 text-white shadow"
          >
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm opacity-90">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paid Assets */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <h2 className="font-semibold">
              Tài Sản Có Chi Phí ({paidAssets.length})
            </h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Tên Tài Sản</th>
                <th className="py-3 px-4 text-left">Loại</th>
                <th className="py-3 px-4 text-left">Chi Phí</th>
                <th className="py-3 px-4 text-left">Thanh Toán</th>
              </tr>
            </thead>
            <tbody>
              {paidAssets.map((a, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4 font-medium">{a.name}</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                      {a.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    {a.cost}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs">
                      {a.payment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Free Assets */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex items-center space-x-2">
            <Gift className="w-5 h-5" />
            <h2 className="font-semibold">
              Tài Sản Miễn Phí ({freeAssets.length})
            </h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Tên Tài Sản</th>
                <th className="py-3 px-4 text-left">Loại</th>
                <th className="py-3 px-4 text-left">Trạng Thái</th>
                <th className="py-3 px-4 text-left">Người Dùng</th>
              </tr>
            </thead>
            <tbody>
              {freeAssets.map((a, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4 font-medium">{a.name}</td>
                  <td className="py-3 px-4">
                    <span className="bg-sky-400 text-white px-3 py-1 rounded-full text-xs">
                      {a.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs">
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                      {a.users}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
