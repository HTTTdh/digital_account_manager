import { useEffect, useState } from "react";
import {
  Package,
  Users,
  AlertTriangle,
  Clock,
  Hourglass,
  Gift,
  PlusCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AssetStore } from "../../stores/asset";
import { AuthStore } from "../../stores/authStore";
import { AssetRequestStore } from "../../stores/assetRequest";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import formatDate from "../../utils/formatDate";
import { motion } from "framer-motion";
function DashboardAdmin() {
  const asset = AssetStore();
  const user = AuthStore();
  const assetRequest = AssetRequestStore();
  const [totalUser, setTotalUser] = useState(0);
  const assetLoginInfo = AssetLoginInfoStore();
  const [allAssets, setAllAssets] = useState([]);
  const [expiredSoonAssets, setExpiredSoonAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await asset.getAllAsset();
      await user.assetPrivate();
      const response = await user.getAllUser();
      await assetRequest.getAllAssetRequest();
      const expiredSoonAssets = await assetLoginInfo.getAssetExpired();
      setExpiredSoonAssets(expiredSoonAssets.value);
      const allAssets = await assetLoginInfo.getAllAssetLoginInfo();
      setAllAssets(allAssets.value);
      setTotalUser(response?.length);
    };

    fetchData();
  }, []);

  const assetWarning = assetLoginInfo?.data?.value?.filter(
    (item) => Number(item.so_ngay_con_lai) <= 7
  );

  const pendingRequest = assetRequest?.data?.yeu_cau?.filter(
    (item) => item.trang_thai === "đang chờ duyệt"
  );

  const StatCard = ({ icon: Icon, value, label, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="shadow-sm border rounded-xl hover:shadow-lg transition">
        <CardContent className="flex items-center justify-between p-5">
          {/* Text */}
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>

          {/* Icon trong vòng tròn nhạt + hover đổi màu */}
          <div
            className={`p-3 rounded-full bg-gradient-to-tr ${color} transition-transform transform hover:scale-110`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );


  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Package}
          value={asset?.data?.length || 0}
          label="Tổng tài sản"
          color="bg-blue-500"
        />
        <StatCard
          icon={Users}
          value={totalUser || 0}
          label="Tổng người dùng"
          color="bg-green-500"
        />
        <StatCard
          icon={AlertTriangle}
          value={assetWarning?.length || 0}
          label="Sắp hết hạn"
          color="bg-yellow-500"
        />
        <StatCard
          icon={Clock}
          value={pendingRequest?.length || 0}
          label="Yêu cầu chờ"
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Requests */}
        <Card className="shadow-sm border rounded-xl py-0" >
          <CardHeader className="bg-blue-500 text-white rounded-t-xl  px-4 py-2">
            <CardTitle className="flex items-center space-x-2 text-base font-semibold ">
              <Hourglass className="w-5 h-5 " />
              <span>Yêu cầu đang chờ duyệt</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {pendingRequest && pendingRequest.length > 0 ? (
              pendingRequest.map((item, index) => (
                <div key={index} className="p-3">
                  <p className="font-medium">{item?.ten_tai_san}</p>
                  <p className="text-sm text-gray-500">
                    Yêu cầu bởi: {item?.nguoi_yeu_cau}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-500 italic">
                Hiện tại chưa có yêu cầu cần phê duyệt
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recently Granted */}
        <Card className="shadow-sm border rounded-xl py-0">
          <CardHeader className="bg-blue-500 text-white rounded-t-xl  px-4 py-2">
            <CardTitle className="flex items-center space-x-2 text-base font-semibold">
              <Gift className="w-5 h-5 " />
              <span>Tài sản cấp gần nhất</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {assetLoginInfo?.data?.value?.slice(0, 4).map((item, index) => (
              <div key={index} className="p-3">
                <p className="font-medium">{item?.ten_tai_san}</p>
                <p className="text-sm text-gray-500">
                  Cấp cho: {item?.ten_phong_ban} - {formatDate(item?.ngay_cap)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recently Added */}
        <Card className="shadow-sm border rounded-xl py-0">
          <CardHeader className="bg-blue-500 text-white rounded-t-xl  px-4 py-2">
            <CardTitle className="flex items-center space-x-2 text-base font-semibold">
              <PlusCircle className="w-5 h-5 " />
              <span>Tài sản mới thêm gần đây</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {asset?.data?.slice(0, 4).map((item, index) => (
              <div key={index} className="p-3">
                <p className="font-medium">
                  {item?.ten_tai_san} - {item?.danh_muc_tai_san_ten}
                </p>
                <p className="text-sm text-gray-500">
                  {item?.danh_muc_tai_san_lien_he}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardAdmin;
