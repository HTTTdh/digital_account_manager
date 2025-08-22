import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function ViewAssetModal({ asset, open, onClose }) {
  if (!asset) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>Chi Tiết Tài Sản</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về tài sản được chọn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p className="font-semibold">Tên:</p>
            <p>{asset.ten_tai_san}</p>

            <p className="font-semibold">Liên hệ:</p>
            <p>{asset.danh_muc_tai_san_lien_he}</p>

            <p className="font-semibold">Link:</p>
            <a
              href={asset.danh_muc_tai_san_link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              {asset.danh_muc_tai_san_link}
            </a>

            <p className="font-semibold">Danh mục:</p>
            <Badge variant="secondary">{asset.danh_muc_tai_san_ten}</Badge>

            <p className="font-semibold">Nhà cung cấp:</p>
            <p>{asset.ten_nha_cung_cap}</p>

            <p className="font-semibold">Tổng số lượng:</p>
            <p>{asset.tong_so_luong}</p>

            <p className="font-semibold">Số lượng còn:</p>
            <p>{asset.so_luong_con}</p>
          </div>

          {asset.thong_tin && (
            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">Thông tin chi tiết:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {Object.entries(asset.thong_tin).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
