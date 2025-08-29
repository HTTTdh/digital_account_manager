import { useEffect, useState } from "react";
import { DepartmentStore } from "../../stores/department";
import { Circle } from "lucide-react";

function DepartmentManager() {
    const department = DepartmentStore();
    const [newDept, setNewDept] = useState("");
    const [editDept, setEditDept] = useState(null);
    const [editName, setEditName] = useState("");

    useEffect(() => {
        department.getAllDepartment();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Quản lý phòng ban</h2>

            {/* Form thêm phòng ban */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Tên phòng ban..."
                />
                <button
                    onClick={async () => {
                        if (newDept.trim()) {
                            await department.createDepartment({ ten: newDept });
                            setNewDept("");
                        }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Thêm
                </button>
            </div>

            {/* Danh sách phòng ban */}
            <ul className="space-y-2">
                {department.data.map((dept) => (
                    <li
                        key={dept.id}
                        className="flex justify-between items-center border p-2 rounded"
                    >
                        <span>{dept.ten}</span>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Circle className="w-8 h-8 text-blue-500" />
                                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-black">
                                    {dept.soluong}
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    setEditDept(dept);
                                    setEditName(dept.ten);
                                }}
                                className="px-3 py-1 bg-yellow-500 text-white rounded"
                            >
                                Sửa
                            </button>
                            <button
                                onClick={() => department.deleteDepartment(dept.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Xóa
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal sửa */}
            {editDept && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow w-[400px]">
                        <h3 className="text-lg font-bold mb-4">Sửa phòng ban</h3>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border p-2 w-full rounded mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setEditDept(null)}
                                className="px-4 py-2 border rounded"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={async () => {
                                    await department.updateDepartment(editDept.id, {
                                        ...editDept,
                                        ten: editName,
                                    });
                                    setEditDept(null);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DepartmentManager;
