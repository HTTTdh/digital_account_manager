import { ArrowRight } from "lucide-react";

export default function ProgressSteps({ selectedDMAssetId, selectedAssetId, selectedManagerId, selectedEmployeeId }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Tiến trình cấp phát</h3>
                <span className="text-sm text-gray-500">
                    {[selectedAssetId, selectedManagerId, selectedEmployeeId].filter(Boolean).length}/4 bước
                </span>
            </div>
            <div className="flex items-center space-x-4">
                {/* Danh mục */}
                <div className={`flex items-center space-x-2 ${selectedDMAssetId ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-3 h-3 rounded-full ${selectedDMAssetId ? "bg-blue-600" : "bg-gray-300"}`}></div>
                    <span className="text-sm font-medium">Danh mục</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />

                {/* Tài sản */}
                <div className={`flex items-center space-x-2 ${selectedAssetId ? "text-green-600" : "text-gray-400"}`}>
                    <div className={`w-3 h-3 rounded-full ${selectedAssetId ? "bg-green-600" : "bg-gray-300"}`}></div>
                    <span className="text-sm font-medium">Tài sản</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />

                {/* Quản lý */}
                <div className={`flex items-center space-x-2 ${selectedManagerId ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-3 h-3 rounded-full ${selectedManagerId ? "bg-blue-600" : "bg-gray-300"}`}></div>
                    <span className="text-sm font-medium">Quản lý</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />

                {/* Nhân viên */}
                <div className={`flex items-center space-x-2 ${selectedEmployeeId ? "text-purple-600" : "text-gray-400"}`}>
                    <div className={`w-3 h-3 rounded-full ${selectedEmployeeId ? "bg-purple-600" : "bg-gray-300"}`}></div>
                    <span className="text-sm font-medium">Nhân viên</span>
                </div>
            </div>
        </div>
    );
}
