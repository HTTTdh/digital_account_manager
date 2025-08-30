import { User } from "lucide-react";

export default function EmployeeSelect({ employees, selectedEmployeeId, setSelectedEmployeeId, disabled }) {
    const selectedEmployee = employees.find((e) => e.id === parseInt(selectedEmployeeId));

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
                <User className="w-5 h-5 text-purple-600" />
                <div>
                    <h3 className="font-semibold text-gray-800">Nhân viên</h3>
                    <p className="text-sm text-gray-500">Người nhận tài sản</p>
                </div>
            </div>
            <select
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                disabled={disabled}
                className="w-full border-2 border-gray-200 rounded-xl p-3 disabled:bg-gray-100"
            >
                <option value="">{disabled ? "Chọn quản lý trước..." : "Chọn nhân viên..."}</option>
                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                        {employee.ho_ten}
                    </option>
                ))}
            </select>
            {selectedEmployee && (
                <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-700 font-medium">✓ {selectedEmployee.ho_ten}</p>
                </div>
            )}
        </div>
    );
}
