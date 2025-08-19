import { X } from "lucide-react";

export default function ViewAssetModal({ asset, onClose }) {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5 hover:cursor-pointer hover:opacity-55" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Chi Tiết Tài Sản</h2>

        <p>
          <strong>Tên:</strong> {asset.ten_tai_san}
        </p>
        <p>
          <strong>Liên hệ:</strong> {asset.danh_muc_tai_san_lien_he}
        </p>
        <p>
          <strong>Link:</strong>{" "}
          <a
            href={asset.danh_muc_tai_san_link}
            className="text-blue-500 underline"
            target="_blank"
            rel="noreferrer"
          >
            {asset.danh_muc_tai_san_link}
          </a>
        </p>
        <p>
          <strong>Danh mục:</strong> {asset.danh_muc_tai_san_ten}
        </p>
        <p>
          <strong>Nhà cung cấp:</strong> {asset.ten_nha_cung_cap}
        </p>
        <p>
          <strong>Tổng số lượng:</strong> {asset.tong_so_luong}
        </p>
        <p>
          <strong>Số lượng còn:</strong> {asset.so_luong_con}
        </p>

        {/* Thông tin chi tiết */}
        {asset.thong_tin && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Thông tin chi tiết:</h3>
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(asset.thong_tin).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
