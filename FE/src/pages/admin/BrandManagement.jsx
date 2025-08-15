import { Eye, Edit, Trash2, ExternalLink } from "lucide-react";

const brands = [
  {
    id: 1,
    name: "Pavietnam",
    desc: "Nhà cung cấp domain và hosting hàng đầu Việt Nam",
    logo: "https://via.placeholder.com/40",
    website: "https://pavietnam.vn",
    email: "support@pavietnam.vn",
    phone: "19009477",
    assetsCount: 15,
    assetsValue: 8500000,
  },
  {
    id: 2,
    name: "Google",
    desc: "Google Services (YouTube, Cloud, Workspace)",
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    website: "https://google.com",
    email: "support@google.com",
    phone: "+1-650-253-0000",
    assetsCount: 8,
    assetsValue: 12000000,
  },
  {
    id: 3,
    name: "Microsoft",
    desc: "Microsoft Office 365, Windows, Azure",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    website: "https://microsoft.com",
    email: "support@microsoft.com",
    phone: "+1-425-882-8080",
    assetsCount: 5,
    assetsValue: 22000000,
  },
  {
    id: 4,
    name: "Adobe",
    desc: "Creative Cloud, Design Software",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Corporate_logo.svg/2048px-Adobe_Corporate_logo.svg.png",
    website: "https://adobe.com",
    email: "support@adobe.com",
    phone: "+1-408-536-6000",
    assetsCount: 3,
    assetsValue: 18000000,
  },
  {
    id: 5,
    name: "Facebook (Meta)",
    desc: "Facebook, Instagram, WhatsApp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
    website: "https://facebook.com",
    email: "support@facebook.com",
    phone: "+1-650-543-4800",
    assetsCount: 4,
    assetsValue: 0,
  },
];

export default function BrandManagement() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <span className="text-blue-700">🏢</span>
          <span>Quản Lý Thương Hiệu</span>
        </h1>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded flex items-center space-x-2">
          <span>+ Thêm Thương Hiệu Mới</span>
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <th className="p-3 text-left">LOGO</th>
            <th className="p-3 text-left">TÊN THƯƠNG HIỆU</th>
            <th className="p-3">WEBSITE</th>
            <th className="p-3">EMAIL HỖ TRỢ</th>
            <th className="p-3">ĐIỆN THOẠI</th>
            <th className="p-3">SỐ TÀI SẢN</th>
            <th className="p-3">THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id} className="border-b">
              {/* Logo */}
              <td className="p-3">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-10 h-10 rounded"
                />
              </td>
              {/* Tên + mô tả */}
              <td className="p-3">
                <div className="font-bold">{brand.name}</div>
                <div className="text-gray-500 text-sm">{brand.desc}</div>
              </td>
              {/* Website */}
              <td className="p-3 text-blue-500">
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1"
                >
                  <span>{brand.website}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </td>
              {/* Email */}
              <td className="p-3 text-blue-500">{brand.email}</td>
              {/* Phone */}
              <td className="p-3">{brand.phone}</td>
              {/* Assets */}
              <td className="p-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {brand.assetsCount}
                  </span>
                  <span>{brand.assetsValue.toLocaleString()} đ</span>
                </div>
              </td>
              {/* Actions */}
              <td className="p-3 flex space-x-2">
                <button className="p-2 border border-blue-300 rounded hover:bg-blue-50">
                  <Eye className="w-4 h-4 text-blue-500" />
                </button>
                <button className="p-2 border border-yellow-300 rounded hover:bg-yellow-50">
                  <Edit className="w-4 h-4 text-yellow-500" />
                </button>
                <button className="p-2 border border-red-300 rounded hover:bg-red-50">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
