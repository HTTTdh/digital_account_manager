import React, { useState, useEffect } from "react";
import AddAccountModal from "../../components/AddAccountModal";

// Mock API data
const mockRequests = [
  {
    id: 1,
    noi_dung: "Cấp email mới cho nhân viên",
    ngay_yeu_cau: "2025-08-12",
    so_luong: 1,
    loai_tai_khoan: "Email",
    nha_cung_cap: "Google",
    nguoi_yeu_cau: "Nguyễn Văn A",
    trang_thai: "pending",
  },
  {
    id: 2,
    noi_dung: "Tài khoản VPN cho dự án X",
    ngay_yeu_cau: "2025-08-11",
    so_luong: 2,
    loai_tai_khoan: "VPN",
    nha_cung_cap: "Cisco",
    nguoi_yeu_cau: "Trần Thị B",
    trang_thai: "approved",
  },
  {
    id: 3,
    noi_dung: "Phần mềm quản lý kho",
    ngay_yeu_cau: "2025-08-10",
    so_luong: 1,
    loai_tai_khoan: "Phần mềm",
    nha_cung_cap: "Microsoft",
    nguoi_yeu_cau: "Lê Văn C",
    trang_thai: "rejected",
  },
];

function DashboardAdmin() {
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  useEffect(() => {
    setRequests(mockRequests);
  }, []);

  const handleOpenModal = (req) => {
    setCurrentRequest(req);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentRequest(null);
  };

  const handleSaveAccount = (jsonData) => {
    console.log(jsonData);

    console.log("Dữ liệu gửi API:", {
      request_id: currentRequest.id,
      data: jsonData,
    });

    // Ví dụ cập nhật trạng thái
    setRequests((prev) =>
      prev.map((req) =>
        req.id === currentRequest.id ? { ...req, trang_thai: "approved" } : req
      )
    );

    handleCloseModal();
  };

  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter((req) => req.trang_thai === filterStatus);

  const statusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h2 className="text-xl font-semibold mb-4">
        Quản lý yêu cầu cấp tài khoản
      </h2>

      {/* Bộ lọc trạng thái */}
      <div className="mb-4">
        <label className="font-medium mr-2">Lọc theo trạng thái:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="all">Tất cả</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <table className="w-full text-sm border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left border-b border-gray-200">ID</th>
            <th className="p-3 text-left border-b border-gray-200">Nội dung</th>
            <th className="p-3 text-left border-b border-gray-200">
              Ngày yêu cầu
            </th>
            <th className="p-3 text-left border-b border-gray-200">Số lượng</th>
            <th className="p-3 text-left border-b border-gray-200">
              Loại tài khoản
            </th>
            <th className="p-3 text-left border-b border-gray-200">
              Nhà cung cấp
            </th>
            <th className="p-3 text-left border-b border-gray-200">
              Người yêu cầu
            </th>
            <th className="p-3 text-left border-b border-gray-200">
              Trạng thái
            </th>
            <th className="p-3 text-left border-b border-gray-200">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((req) => (
            <tr
              key={req.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="p-3 border-b border-gray-100">{req.id}</td>
              <td className="p-3 border-b border-gray-100">{req.noi_dung}</td>
              <td className="p-3 border-b border-gray-100">
                {req.ngay_yeu_cau}
              </td>
              <td className="p-3 border-b border-gray-100">{req.so_luong}</td>
              <td className="p-3 border-b border-gray-100">
                {req.loai_tai_khoan}
              </td>
              <td className="p-3 border-b border-gray-100">
                {req.nha_cung_cap}
              </td>
              <td className="p-3 border-b border-gray-100">
                {req.nguoi_yeu_cau}
              </td>
              <td className="p-3 border-b border-gray-100">
                {statusBadge(req.trang_thai)}
              </td>
              <td className="p-3 border-b border-gray-100 space-x-2">
                {req.trang_thai === "pending" && (
                  <button
                    onClick={() => handleOpenModal(req)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Duyệt
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <AddAccountModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAccount}
        currentRequest={currentRequest}
      />
    </div>
  );
}

export default DashboardAdmin;
