import React, { useState, useEffect } from "react";

// Mock API data (bạn thay bằng fetch thực tế)
const mockAccountTypes = [
  { id: 1, loai: "Email" },
  { id: 2, loai: "Phần mềm" },
  { id: 3, loai: "Điện thoại" },
  { id: 4, loai: "VPN" },
  { id: 5, loai: "Khác" },
];

const mockSuppliers = [
  { id: 1, ten: "Google", lien_he: "support@google.com" },
  { id: 2, ten: "Microsoft", lien_he: "support@microsoft.com" },
  { id: 3, ten: "Cisco", lien_he: "support@cisco.com" },
];

function RequestAccount() {
  const [loaiTaiKhoanList, setLoaiTaiKhoanList] = useState([]);
  const [DanhMucTaiSanList, setDanhMucTaiSanList] = useState([]);

  const [loaiTaiKhoanId, setLoaiTaiKhoanId] = useState("");
  const [DanhMucTaiSanId, setDanhMucTaiSanId] = useState("");
  const [soLuong, setSoLuong] = useState(1);
  const [noiDung, setNoiDung] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch từ API, tạm thời dùng mock
    setLoaiTaiKhoanList(mockAccountTypes);
    setDanhMucTaiSanList(mockSuppliers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!loaiTaiKhoanId) {
      setError("Vui lòng chọn loại tài khoản.");
      return;
    }
    if (!DanhMucTaiSanId) {
      setError("Vui lòng chọn nhà cung cấp.");
      return;
    }
    if (!noiDung.trim()) {
      setError("Vui lòng nhập nội dung yêu cầu.");
      return;
    }
    if (soLuong <= 0) {
      setError("Số lượng phải lớn hơn 0.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        noi_dung: noiDung,
        ngay_yeu_cau: new Date().toISOString(),
        so_luong: soLuong,
        trang_thai: "pending",
        loai_tai_khoan_id: loaiTaiKhoanId,
        nha_cung_cap_id: DanhMucTaiSanId,
        nguoi_duyet_id: null, // backend xử lý
        nguoi_yeu_cau_id: 123, // lấy từ user login
      };

      console.log("Gửi payload:", payload);

      // Gọi API
      // await fetch("/api/yeu-cau", { method: "POST", body: JSON.stringify(payload) });

      setSuccessMsg("Gửi yêu cầu thành công!");
      setLoaiTaiKhoanId("");
      setDanhMucTaiSanId("");
      setSoLuong(1);
      setNoiDung("");
    } catch (err) {
      setError("Có lỗi khi gửi yêu cầu.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-base";

  return (
    <div className="max-w-xl mx-auto m-5 p-5 border border-gray-300 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Yêu cầu cấp tài khoản</h2>

      {error && <div className="text-red-500 mb-3">{error}</div>}
      {successMsg && <div className="text-green-600 mb-3">{successMsg}</div>}

      <form onSubmit={handleSubmit}>
        {/* Loại tài khoản */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Loại tài khoản <span className="text-red-500">*</span>
          </label>
          <select
            value={loaiTaiKhoanId}
            onChange={(e) => setLoaiTaiKhoanId(e.target.value)}
            className={inputClass}
          >
            <option value="">-- Chọn loại tài khoản --</option>
            {loaiTaiKhoanList.map((type) => (
              <option key={type.id} value={type.id}>
                {type.loai}
              </option>
            ))}
          </select>
        </div>

        {/* Nhà cung cấp */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Nhà cung cấp <span className="text-red-500">*</span>
          </label>
          <select
            value={DanhMucTaiSanId}
            onChange={(e) => setDanhMucTaiSanId(e.target.value)}
            className={inputClass}
          >
            <option value="">-- Chọn nhà cung cấp --</option>
            {DanhMucTaiSanList.map((ncc) => (
              <option key={ncc.id} value={ncc.id}>
                {ncc.ten}
              </option>
            ))}
          </select>
        </div>

        {/* Số lượng */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Số lượng <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
            className={inputClass}
            min="1"
          />
        </div>

        {/* Nội dung yêu cầu */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Nội dung yêu cầu <span className="text-red-500">*</span>
          </label>
          <textarea
            value={noiDung}
            onChange={(e) => setNoiDung(e.target.value)}
            rows={4}
            className={inputClass}
            placeholder="Mô tả nội dung yêu cầu..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2 text-white rounded-md transition-colors ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Đang gửi..." : "Gửi yêu cầu"}
        </button>
      </form>
    </div>
  );
}

export default RequestAccount;
