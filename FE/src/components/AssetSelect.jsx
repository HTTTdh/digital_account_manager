import { HardDrive } from "lucide-react";

export default function AssetSelect({ assetsInCategory, selectedAssetId, setSelectedAssetId, disabled }) {
    const selectedAsset = assetsInCategory.find((a) => a.id === parseInt(selectedAssetId));

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
                <HardDrive className="w-5 h-5 text-blue-600" />
                <div>
                    <h3 className="font-semibold text-gray-800">Chọn Tài sản</h3>
                    <p className="text-sm text-gray-500">Tài sản cần cấp phát</p>
                </div>
            </div>
            <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                disabled={disabled}
                className="w-full border-2 border-gray-200 rounded-xl p-3 disabled:bg-gray-100"
            >
                <option value="">Chọn tài sản...</option>
                {assetsInCategory.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                        {asset.ten_tai_san}
                    </option>
                ))}
            </select>
            {selectedAsset && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">✓ {selectedAsset.ten_tai_san}</p>
                </div>
            )}
        </div>
    );
}
