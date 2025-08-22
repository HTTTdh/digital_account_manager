import { useEffect, useState } from "react";

// --- DỮ LIỆU MẪU ---
const sampleAssets = [
  { id: "asset-01", ten_tai_san: "Laptop Dell XPS 15" },
  { id: "asset-02", ten_tai_san: "Màn hình LG UltraWide 34'" },
  { id: "asset-03", ten_tai_san: "Bàn phím cơ Filco" },
  { id: "asset-04", ten_tai_san: "Bản quyền phần mềm Figma" },
];

const sampleUsers = [
  // Quản lý
  {
    id: "manager-1",
    ho_ten: "Nguyễn Văn An",
    email: "annv@company.com",
    chuc_vu: "Trưởng phòng Kỹ thuật",
    role: "manager",
    managerId: null,
  },
  {
    id: "manager-2",
    ho_ten: "Trần Thị Bình",
    email: "binhtt@company.com",
    chuc_vu: "Trưởng phòng Kinh doanh",
    role: "manager",
    managerId: null,
  },
  // Nhân viên phòng Kỹ thuật
  {
    id: "user-101",
    ho_ten: "Lê Minh Cường",
    email: "cuonglm@company.com",
    chuc_vu: "Lập trình viên Backend",
    role: "employee",
    managerId: "manager-1",
  },
  {
    id: "user-102",
    ho_ten: "Phạm Thuỳ Dung",
    email: "dungpt@company.com",
    chuc_vu: "Lập trình viên Frontend",
    role: "employee",
    managerId: "manager-1",
  },
  // Nhân viên phòng Kinh doanh
  {
    id: "user-201",
    ho_ten: "Hoàng Văn Giang",
    email: "gianghv@company.com",
    chuc_vu: "Nhân viên kinh doanh",
    role: "employee",
    managerId: "manager-2",
  },
  {
    id: "user-202",
    ho_ten: "Vũ Thị Hà",
    email: "havt@company.com",
    chuc_vu: "Nhân viên marketing",
    role: "employee",
    managerId: "manager-2",
  },
];
// --- KẾT THÚC DỮ LIỆU MẪU ---

export default function ReportStats() {
  // State để lưu trữ dữ liệu
  const [allAssets, setAllAssets] = useState([]);
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Phân loại dữ liệu mẫu vào state
  useEffect(() => {
    setAllAssets(sampleAssets);
    const managerList = sampleUsers.filter((user) => user.role === "manager");
    const employeeList = sampleUsers.filter((user) => user.role === "employee");
    setManagers(managerList);
    setEmployees(employeeList);
  }, []);

  // Hàm hỗ trợ lấy tên quản lý từ ID
  const getManagerName = (managerId) => {
    const manager = managers.find((m) => m.id === managerId);
    return manager ? manager.ho_ten : "Không có";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Báo cáo & Thống kê
      </h1>

      {/* Bảng 1: Danh sách tài sản */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Danh sách Toàn bộ Tài sản
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Tên Tài Sản</th>
              </tr>
            </thead>
            <tbody>
              {allAssets.map((asset, idx) => (
                <tr
                  key={asset.id}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4 font-medium">{asset.ten_tai_san}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bảng 2: Danh sách quản lý */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Danh sách Quản lý Phòng ban
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Tên Quản Lý</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Chức vụ</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager, idx) => (
                <tr
                  key={manager.id}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4 font-medium">{manager.ho_ten}</td>
                  <td className="py-3 px-4">{manager.email}</td>
                  <td className="py-3 px-4">{manager.chuc_vu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bảng 3: Danh sách nhân viên */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Danh sách Nhân viên
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Tên Nhân Viên</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Chức vụ</th>
                <th className="py-3 px-4 text-left">Quản lý trực tiếp</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, idx) => (
                <tr
                  key={employee.id}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-4 font-medium">{employee.ho_ten}</td>
                  <td className="py-3 px-4">{employee.email}</td>
                  <td className="py-3 px-4">{employee.chuc_vu}</td>
                  <td className="py-3 px-4">
                    {getManagerName(employee.managerId)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
