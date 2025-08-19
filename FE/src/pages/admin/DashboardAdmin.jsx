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
import { AssetStore } from "../../stores/asset";
import { AuthStore } from "../../stores/authStore";
import { AssetRequestStore } from "../../stores/assetRequest";

function DashboardAdmin() {
  const asset = AssetStore();
  const user = AuthStore();
  const assetRequest = AssetRequestStore();

  useEffect(() => {
    const fetchData = async () => {
      await asset.getAllAsset();
      await user.assetPrivate();
      // await user.getAllUser();
      await assetRequest.getAllAssetRequest();
    };

    fetchData();
  }, []);
  const pendingRequest = assetRequest?.data?.yeu_cau?.filter(
    (item) => item.trang_thai === "đang chờ duyệt"
  );
  console.log(assetRequest?.data);

  const [stats, setStats] = useState({
    totalAssets: 39,
    totalUsers: 12,
    expiringSoon: 12,
    pendingRequests: 4,
  });

  return (
    <div className="max-w-7xl mx-auto p-5">
      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1: Tổng tài sản */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 flex items-center space-x-4 shadow-md">
          <div className="bg-white/20 p-3 rounded-full">
            <Package className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">
              {asset?.data?.length || 0}
            </p>
            <p className="text-white text-sm">TỔNG TÀI SẢN</p>
          </div>
        </div>

        {/* Card 2: Tổng người dùng */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 flex items-center space-x-4 shadow-md">
          <div className="bg-white/20 p-3 rounded-full">
            <Users className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
            <p className="text-white text-sm">TỔNG NGƯỜI DÙNG</p>
          </div>
        </div>

        {/* Card 3: Sắp hết hạn */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-5 flex items-center space-x-4 shadow-md">
          <div className="bg-white/20 p-3 rounded-full">
            <AlertTriangle className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">
              {stats.expiringSoon}
            </p>
            <p className="text-white text-sm">SẮP HẾT HẠN</p>
          </div>
        </div>

        {/* Card 4: Yêu cầu chờ */}
        <div className="bg-gradient-to-r from-pink-400 to-pink-500 rounded-xl p-5 flex items-center space-x-4 shadow-md">
          <div className="bg-white/20 p-3 rounded-full">
            <Clock className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">
              {pendingRequest?.length}
            </p>
            <p className="text-white text-sm">YÊU CẦU CHỜ</p>
          </div>
        </div>
      </div>

      {/* Three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Requests */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-t-lg text-white font-semibold flex items-center space-x-2">
            <Hourglass className="w-5 h-5" />
            <span>Yêu cầu đang chờ duyệt</span>
          </div>
          {pendingRequest?.map((item, index) => (
            <div key={index} className="p-3 border-b">
              <p className="font-medium">{item.ten_nha_cung_cap}</p>
              <p className="text-sm text-gray-500">
                Yêu cầu bởi: {item.nguoi_yeu_cau}
              </p>
            </div>
          ))}
        </div>

        {/* Recently Granted */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-t-lg text-white font-semibold flex items-center space-x-2">
            <Gift className="w-5 h-5" />
            <span>Tài sản cấp gần nhất</span>
          </div>
          <div className="divide-y">
            <div className="p-3">
              <p className="font-medium">WhatsApp Business TMEDU</p>
              <p className="text-sm text-gray-500">
                Cấp cho: Customer Service - 15/5/2024
              </p>
            </div>
            <div className="p-3">
              <p className="font-medium">API Gateway Service</p>
              <p className="text-sm text-gray-500">
                Cấp cho: Hoàng Văn Developer - 1/4/2024
              </p>
            </div>
            <div className="p-3">
              <p className="font-medium">Container Registry - Docker Hub</p>
              <p className="text-sm text-gray-500">
                Cấp cho: Hoàng Văn Developer - 15/3/2024
              </p>
            </div>
            <div className="p-3">
              <p className="font-medium">Pinterest TMEDU Inspiration</p>
              <p className="text-sm text-gray-500">
                Cấp cho: Nguyễn Thị Designer - 15/3/2024
              </p>
            </div>
          </div>
        </div>

        {/* Recently Added */}
        <div className="bg-white rounded-lg shadow">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-t-lg text-white font-semibold flex items-center space-x-2">
            <PlusCircle className="w-5 h-5" />
            <span>Tài sản mới thêm gần đây</span>
          </div>
          <div className="divide-y">
            <div className="p-3">
              <p className="font-medium">WhatsApp Business TMEDU</p>
              <p className="text-sm text-gray-500">Thêm ngày: 1/5/2024</p>
            </div>
            <div className="p-3">
              <p className="font-medium">Reddit Community r/TMEDU</p>
              <p className="text-sm text-gray-500">Thêm ngày: 1/4/2024</p>
            </div>
            <div className="p-3">
              <p className="font-medium">API Gateway Service</p>
              <p className="text-sm text-gray-500">Thêm ngày: 15/3/2024</p>
            </div>
            <div className="p-3">
              <p className="font-medium">Container Registry - Docker Hub</p>
              <p className="text-sm text-gray-500">Thêm ngày: 1/3/2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
