import { useEffect, useState } from "react";
import { UserStore } from "../../../stores/tai_khoan";
import ThemTaiKhoan from "./ThemTaiKhoan";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserManagement() {
  const userStore = UserStore();

  const [tai_khoan, setTaiKhoan] = useState([]);
  const [phong_ban, setPhongBan] = useState([]);
  const [selectedPhongBan, setSelectedPhongBan] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(false);

  const fetchData = async () => {
    const data_taikhoan = await userStore.findforLevel2();
    const data_phongban = await userStore.getPhongBan();
    setPhongBan(data_phongban.data);
    setTaiKhoan(data_taikhoan);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleThemTaiKhoan = async (formData) => {
    try {
      await userStore.themTaiKhoan(formData);
      setShowModal(false);
      setEditUser(null);
      await fetchData();
    } catch (error) {
      console.error("Lỗi thêm tài khoản:", error);
    }
  };

  const handleCapNhatTaiKhoan = async (formData) => {
    try {
      await userStore.suaTaiKhoan(editUser.id, formData);
      setEditUser(null);
      setShowModal(false);
      await fetchData();
    } catch (error) {
      console.error("Lỗi cập nhật tài khoản:", error);
    }
  };

  const filteredUsers = tai_khoan.filter((user) => {
    return (
      selectedPhongBan === "" || user.phong_ban_id === Number(selectedPhongBan)
    );
  });

  const userColumns = ({ phong_ban, onEdit }) => [
    {
      key: "username",
      label: "USERNAME",
      align: "left",
    },
    {
      key: "ho_ten",
      label: "HỌ VÀ TÊN",
      align: "left",
    },
    {
      key: "cap",
      label: "CẤP",
      align: "center",
      render: (row) => row.cap || "—",
    },
    {
      key: "phong_ban_id",
      label: "BỘ PHẬN",
      align: "center",
      render: (row) =>
        phong_ban.find((pb) => pb.id === row.phong_ban_id)?.ten || "Chưa có",
    },
    {
      key: "sdt",
      label: "SỐ ĐIỆN THOẠI",
      align: "center",
    },
    {
      key: "actions",
      label: "THAO TÁC",
      align: "center",
      render: (row) => (
        <Button
          size="icon"
          variant="outline"
          onClick={() => onEdit(row)}
        >
          <Edit className="h-4 w-4 text-yellow-500" />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      {/* Bộ lọc */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="text-sm font-medium mr-2">Bộ phận:</label>
          <Select value={selectedPhongBan} onValueChange={setSelectedPhongBan}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Tất cả bộ phận" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả bộ phận</SelectItem>
              {phong_ban.map((opt) => (
                <SelectItem key={opt.id} value={String(opt.id)}>
                  {opt.ten}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

      {/* Bảng */}
      {/* <Table className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <TableHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <TableRow>
            <TableHead>USERNAME</TableHead>
            <TableHead>HỌ VÀ TÊN</TableHead>
            <TableHead className="text-center">CẤP</TableHead>
            <TableHead className="text-center">BỘ PHẬN</TableHead>
            <TableHead className="text-center">SỐ ĐIỆN THOẠI</TableHead>
            <TableHead className="text-center">THAO TÁC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.ho_ten}</TableCell>
              <TableCell className="text-center">{user.cap || "—"}</TableCell>
              <TableCell className="text-center">
                {phong_ban.find((pb) => pb.id === user.phong_ban_id)?.ten || "Chưa có"}
              </TableCell>
              <TableCell className="text-center">{user.sdt}</TableCell>
              <TableCell className="text-center">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setEditUser(user);
                    setShowModal(true);
                  }}
                >
                  <Edit className="h-4 w-4 text-yellow-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      <DataTable
        columns={userColumns({
          phong_ban,
          onEdit: (user) => {
            setEditUser(user);
            setShowModal(true);
          },
        })}
        data={filteredUsers}
      />
      {/* Modal thêm / sửa */}
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
    </div>
  );
}
