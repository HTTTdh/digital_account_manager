import { ClipboardCheck, Check, X } from "lucide-react";

const requests = [
  {
    id: 1,
    assetName: "Figma Professional",
    department: "Không xác định",
    requester: "Không rõ",
    category: "Tài sản mới",
    type: "Không rõ",
    reason: "Cần thiết kế UI/UX cho dự án mới",
    note: "Không có",
    date: "14/8/2025",
    priority: "Ưu tiên cao",
  },
  {
    id: 2,
    assetName: "Microsoft Office 365 Business",
    department: "Không xác định",
    requester: "Không rõ",
    category: "Tài sản mới",
    type: "Không rõ",
    reason: "Phục vụ cho bộ phận kế toán",
    note: "Không có",
    date: "14/8/2025",
    priority: "Ưu tiên cao",
  },
];

export default function ApproveRequests() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-t-4 border-purple-500 p-4 flex items-center space-x-2 mb-6">
        <ClipboardCheck className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl font-bold">Phê Duyệt Yêu Cầu</h1>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-start"
          >
            {/* Left Info */}
            <div>
              <div className="font-bold text-lg">{req.assetName}</div>
              <p>
                <span className="font-semibold">Bộ phận yêu cầu:</span>{" "}
                {req.department}
              </p>
              <p>
                <span className="font-semibold">Người yêu cầu:</span>{" "}
                {req.requester}
              </p>
              <p>
                <span className="font-semibold">Danh mục tài sản:</span>{" "}
                <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">
                  {req.category}
                </span>
              </p>
              <p>
                <span className="font-semibold">Loại yêu cầu:</span> {req.type}
              </p>
              <p>
                <span className="font-semibold">Lý do:</span> {req.reason}
              </p>
              <p>
                <span className="font-semibold">Ghi chú:</span> {req.note}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Ngày yêu cầu: {req.date}
              </p>
            </div>

            {/* Right Actions */}
            <div className="flex flex-col items-end space-y-2">
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                {req.priority}
              </span>
              <div className="flex space-x-2 mt-2">
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded flex items-center space-x-1">
                  <Check className="w-4 h-4" />
                  <span>Phê Duyệt</span>
                </button>
                <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>Từ Chối</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
