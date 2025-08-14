import React from "react";

const mockManagerAssets = [
  {
    id: 1,
    username: "nguyenvana",
    link_dang_nhap: "https://mail.google.com",
    ngay_cap: "2024-01-15",
    ngay_het_han: "2025-01-15",
    loai_tai_khoan: {
      id: 1,
      loai: "Email",
      note: "Tài khoản Gmail công việc",
    },
    nha_cung_cap: {
      id: 1,
      ten: "Google",
      lien_he: "support@google.com",
      link: "https://workspace.google.com",
    },
  },
  {
    id: 2,
    username: "tranthib",
    link_dang_nhap: "https://login.microsoftonline.com",
    ngay_cap: "2024-02-10",
    ngay_het_han: "2025-02-10",
    loai_tai_khoan: {
      id: 2,
      loai: "Phần mềm",
      note: "Tài khoản Microsoft Office 365",
    },
    nha_cung_cap: {
      id: 2,
      ten: "Microsoft",
      lien_he: "support@microsoft.com",
      link: "https://www.microsoft.com",
    },
  },
  {
    id: 3,
    username: "phamvanh",
    link_dang_nhap: "https://vpn.cisco.com",
    ngay_cap: "2024-03-01",
    ngay_het_han: "2025-03-01",
    loai_tai_khoan: {
      id: 4,
      loai: "VPN",
      note: "Tài khoản VPN truy cập từ xa",
    },
    nha_cung_cap: {
      id: 3,
      ten: "Cisco",
      lien_he: "support@cisco.com",
      link: "https://www.cisco.com",
    },
  },
];

function ManagerAssetList() {
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">Tài sản phòng ban</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">Loại tài khoản</th>
            <th className="border border-gray-300 p-2">Nhà cung cấp</th>
            <th className="border border-gray-300 p-2">Ngày cấp</th>
            <th className="border border-gray-300 p-2">Ngày hết hạn</th>
            <th className="border border-gray-300 p-2">Link đăng nhập</th>
          </tr>
        </thead>
        <tbody>
          {mockManagerAssets.map((asset, index) => (
            <tr key={asset.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{asset.username}</td>
              <td className="border border-gray-300 p-2">
                {asset.loai_tai_khoan.loai}
              </td>
              <td className="border border-gray-300 p-2">
                {asset.nha_cung_cap.ten}
              </td>
              <td className="border border-gray-300 p-2">{asset.ngay_cap}</td>
              <td className="border border-gray-300 p-2">
                {asset.ngay_het_han}
              </td>
              <td className="border border-gray-300 p-2">
                <a
                  href={asset.link_dang_nhap}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Truy cập
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerAssetList;
