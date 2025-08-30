import { HardDrive } from "lucide-react";

export default function AssetCategorySelect({ allDMAssets, selectedDMAssetId, setSelectedDMAssetId }) {
    const selectedDMAsset = allDMAssets.find((dm) => dm.id === parseInt(selectedDMAssetId));

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
                <HardDrive className="w-5 h-5 text-blue-600" />
                <div>
                    <h3 className="font-semibold text-gray-800">Chọn Danh mục tài sản</h3>
                    <p className="text-sm text-gray-500">Danh mục tài sản được phép cấp</p>
                </div>
            </div>
            <select
                value={selectedDMAssetId}
                onChange={(e) => setSelectedDMAssetId(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-3"
            >
                <option value="">Chọn danh mục tài sản...</option>
                {allDMAssets.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                        {asset.ten}
                    </option>
                ))}
            </select>
            {selectedDMAsset && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">✓ {selectedDMAsset.ten}</p>
                </div>
            )}
        </div>
    );
}
