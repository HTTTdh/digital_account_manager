import { useEffect, useState } from "react";
import { UserStore } from "../../../stores/tai_khoan";
import { DepartmentStore } from "../../../stores/department";
import ThemTaiKhoan from "./ThemTaiKhoan";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";

export default function UserManagement() {
  const userStore = UserStore();
  const departmentStore = DepartmentStore();

  const { dataLevel1, findforLevel1, themTaiKhoan, suaTaiKhoan } = userStore;
  const { data: phong_ban, getAllDepartment } = departmentStore;

  const [selectedPhongBan, setSelectedPhongBan] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await findforLevel1();
        await getAllDepartment();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleThemTaiKhoan = async (formData) => {
    const response = await themTaiKhoan(formData);

    if (!response?.success) {
      alert(`Thêm tài khoản thất bại: trùng username`);
      toast.error(response.error);
      return;
    }

    alert("Thêm tài khoản thành công");
    setShowModal(false);
    setEditUser(null);
    window.location.reload();
  };


  // Cập nhật tài khoản
  const handleCapNhatTaiKhoan = async (formData) => {
    try {
      if (!editUser) return;
      setLoading(true);
      await suaTaiKhoan(editUser.id, formData);
      alert("Cập nhật tài khoản thành công");
      setEditUser(null);
      setShowModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Lỗi cập nhật tài khoản:", err);
      toast.error("Cập nhật tài khoản thất bại");
    } finally {
      setLoading(false);
    }
  };

  // Lọc trực tiếp từ store
  const filteredUsers = dataLevel1.filter(
    (user) => selectedPhongBan === "all" || user.phong_ban_id === Number(selectedPhongBan)
  );
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản Lý Tài Khoản</h1>
          <p className="text-gray-500">Trang quản lý tất cả tài khoản nhân viên</p>
        </div>
        <Button
          onClick={() => {
            setEditUser(null);
            setShowModal(true);
          }}
        >
          + Thêm tài khoản
        </Button>
      </div>

      {/* Modal thêm/sửa */}
      {showModal && (
        <ThemTaiKhoan
          showModal={showModal}
          setShowModal={(value) => {
            setShowModal(value);
            if (!value) setEditUser(null);
          }}
          phong_ban={phong_ban}
          onSubmit={editUser ? handleCapNhatTaiKhoan : handleThemTaiKhoan}
          editUser={editUser}
        />
      )}

      {/* Bộ lọc */}
      <div className="my-4 w-56">
        <Select value={selectedPhongBan} onValueChange={setSelectedPhongBan}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả bộ phận" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả bộ phận</SelectItem>
            {phong_ban?.map((pb) => (
              <SelectItem key={pb.id} value={String(pb.id)}>
                {pb.ten}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bảng dữ liệu */}
      {loading ? (
        <div>Đang tải dữ liệu...</div>
      ) : (
        <Table className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <TableHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <TableRow>
              <TableHead className="text-left font-semibold text-gray-700">USERNAME</TableHead>
              <TableHead className="text-left font-semibold text-gray-700">HỌ VÀ TÊN</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">CẤP</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">BỘ PHẬN</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">SỐ ĐIỆN THOẠI</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">THAO TÁC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              < TableRow key={user.id} className="hover:bg-blue-50 transition-colors even:bg-gray-50" >
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.ho_ten}</TableCell>
                <TableCell className="text-center">{user.cap || "—"}</TableCell>
                <TableCell className="text-center">
                  {phong_ban?.find((pb) => pb.id === user.phong_ban_id)?.ten || "Chưa có"}
                </TableCell>
                <TableCell className="text-center">{user.sdt}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => { setEditUser(user); setShowModal(true); }}>
                      <Edit className="h-4 w-4 text-yellow-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
      }
    </div >
  );
}
