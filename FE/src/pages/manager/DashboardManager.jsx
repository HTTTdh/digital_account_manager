import { useEffect, useState } from "react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { getLocalStorage } from "../../utils/localStorage";
import { PackageOpen } from "lucide-react";
import { AuthStore } from "../../stores/authStore";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

function DashboardManager() {
  const assetLoginInfo = AssetLoginInfoStore();
  const user = getLocalStorage("user");
  const auth = AuthStore();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userInDepartment, setUserInDepartment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user.PhongBanId) {
        await assetLoginInfo.getAssetLoginInfoByDepartment(user.PhongBanId);
      }
      const response = await auth.getAllUser();
      const userInDepartment = response?.filter(
        (item) => item.phong_ban_id === user.PhongBanId
      );
      setUserInDepartment(userInDepartment);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-900">
        Dashboard Tài sản số
      </h2>

      {assetLoginInfo?.data?.value?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Tổng số tài sản */}
            <Card
              className={`cursor-pointer transform transition-all duration-300 rounded-xl shadow-md
                ${selectedCategory === "assets"
                  ? "border-2 border-blue-500 scale-105 shadow-lg"
                  : "hover:scale-105 hover:shadow-lg"
                }`}
              onClick={() => setSelectedCategory("assets")}
            >
              <CardHeader>
                <CardTitle className="text-blue-600 text-lg font-semibold">
                  Tổng số tài sản số
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-800">
                  {assetLoginInfo?.data?.value?.length}
                </p>
              </CardContent>
            </Card>

            {/* Card Tổng nhân viên */}
            <Card
              className={`cursor-pointer transform transition-all duration-300 rounded-xl shadow-md
                ${selectedCategory === "employees"
                  ? "border-2 border-green-500 scale-105 shadow-lg"
                  : "hover:scale-105 hover:shadow-lg"
                }`}
              onClick={() => setSelectedCategory("employees")}
            >
              <CardHeader>
                <CardTitle className="text-green-600 text-lg font-semibold">
                  Tổng nhân viên phòng ban
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-800 ">
                  {userInDepartment?.length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Danh sách chi tiết */}
          {selectedCategory && (
            <Card className="mt-6 rounded-xl shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {selectedCategory === "assets"
                    ? "Danh sách tài sản số"
                    : "Danh sách nhân viên phòng ban"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-2">
                  <ul className="space-y-2">
                    {selectedCategory === "assets"
                      ? assetLoginInfo?.data?.value?.map((asset, index) => (
                        <li
                          key={index}
                          className="p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                          onClick={() => setSelectedAsset(asset)}
                        >
                          {asset?.ten_tai_san}
                        </li>
                      ))
                      : userInDepartment.map((employee, index) => (
                        <li
                          key={index}
                          className="p-3 rounded-lg border border-gray-200 flex justify-between items-center hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                          onClick={() => setSelectedUser(employee)}
                        >
                          <span>{employee?.ho_ten}</span>
                          {employee.id === user.id && (
                            <span className="text-xs font-bold text-white bg-blue-500 px-2 py-0.5 rounded-full">
                              BẠN
                            </span>
                          )}
                        </li>
                      ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl shadow-inner">
          <PackageOpen className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">
            Chưa có dữ liệu
          </h3>
          <p className="text-gray-500 mt-2 text-center">
            Hiện tại phòng ban của bạn chưa có tài sản số nào.
          </p>
        </div>
      )}

      <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
        <DialogContent className="max-w-lg rounded-xl shadow-lg bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Chi tiết tài sản
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4 text-gray-700">
            {/* Thông tin cơ bản */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Tên tài sản</p>
                <p className="font-semibold text-gray-800">{selectedAsset?.ten_tai_san}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Nhà cung cấp</p>
                <p className="font-semibold text-gray-800">{selectedAsset?.ten_nha_cung_cap}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Người nhận</p>
                <p className="font-semibold text-gray-800">{selectedAsset?.ho_ten_nguoi_nhan}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Danh mục</p>
                <p className="font-semibold text-gray-800">{selectedAsset?.ten_danh_muc_tai_san}</p>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            {selectedAsset?.thong_tin && (
              <div className="mt-4 border-t pt-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Thông tin chi tiết
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(selectedAsset.thong_tin).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <p className="text-sm text-gray-500">{key}</p>
                      <p className="font-semibold text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal chi tiết nhân viên */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md rounded-xl shadow-lg bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Chi tiết nhân viên
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4 text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Họ và tên</p>
                <p className="font-semibold text-gray-800">{selectedUser?.ho_ten}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Tên đăng nhập</p>
                <p className="font-semibold text-gray-800">{selectedUser?.username}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Số điện thoại</p>
                <p className="font-semibold text-gray-800">{selectedUser?.sdt}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Phòng ban</p>
                <p className="font-semibold text-gray-800">{selectedUser?.ten}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default DashboardManager;
