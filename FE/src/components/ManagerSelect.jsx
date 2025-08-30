import { Users } from "lucide-react";

export default function ManagerSelect({ managers, selectedManagerId, setSelectedManagerId }) {
    const selectedManager = managers.find((m) => m.id === parseInt(selectedManagerId));

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
                <Users className="w-5 h-5 text-green-600" />
                <div>
                    <h3 className="font-semibold text-gray-800">Quản lý Phòng ban</h3>
                    <p className="text-sm text-gray-500">Người đại diện phê duyệt</p>
                </div>
            </div>
            <select
                value={selectedManagerId}
                onChange={(e) => setSelectedManagerId(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-3"
            >
                <option value="">Chọn quản lý...</option>
                {managers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                        {manager.ho_ten} ({manager.ten})
                    </option>
                ))}
            </select>
            {selectedManager && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">✓ {selectedManager.ho_ten}</p>
                </div>
            )}
        </div>
    );
}
