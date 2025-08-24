import { useEffect, useState } from "react";
import { History, LogIn, CheckCircle, AlertTriangle } from "lucide-react";
import { activityHistory } from "../../stores/activityHistory";
import { UserStore } from "../../stores/tai_khoan";
const typeConfig = {
  login: { icon: <LogIn className="w-5 h-5" />, color: "bg-blue-500" },
  approve: {
    icon: <CheckCircle className="w-5 h-5" />,
    color: "bg-yellow-500",
  },
  warning: { icon: <AlertTriangle className="w-5 h-5" />, color: "bg-red-500" },
};

export default function ActivityHistory() {
  const userStore = UserStore();
  const { getAllHistory } = activityHistory();
  const [phong_ban, setPhongBan] = useState([]);
  const [filters, setFilters] = useState({
    userId: "",
    phongBanId: "",
    date: "",
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const fetchData = async (useFilter = false) => {
    const res = await getAllHistory(useFilter ? filters : {});
    const data_phongban = await userStore.getPhongBan();
    setPhongBan(data_phongban.data);
    setActivities(res || []);
  };
  useEffect(() => {
    fetchData(false);
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border-t-4 border-purple-500 p-4 flex items-center space-x-2 mb-6">
        <History className="w-6 h-6 text-purple-600" />
        <h1 className="text-xl font-bold">Lịch Sử Hoạt Động</h1>
      </div>

      {/* Bộ lọc */}
      <div className="flex items-center gap-4 mb-6">
        {/* <select
          name="userId"
          value={filters.userId}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          <option value="">Chọn User</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select> */}

        <select
          name="phongBanId"
          value={filters.phongBanId}
          onChange={handleChange}
          className="border rounded-lg p-2"
        >
          <option value="">Chọn Phòng Ban</option>
          {phong_ban.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.ten}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="border rounded-lg p-2"
        />

        <button
          onClick={() => fetchData(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:opacity-70"
        >
          Lọc
        </button>
      </div>

      <div className="relative pl-8 overflow-y-auto h-[500px]">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {loading ? (
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : activities.length === 0 ? (
          <p className="text-gray-500">Không có dữ liệu</p>
        ) : (
          activities.map((act, index) => (
            <div
              key={`${act.hanh_dong_id}-${index}`}
              className="relative mb-6 flex items-start "
            >
              {/* Icon bên trái */}
              <div
                className={`absolute left-0 flex items-center justify-center w-6 h-6 rounded-full text-white bg-purple-500`}
              >
                <History className="w-4 h-4" />
              </div>

              {/* Nội dung */}

              <div className="bg-white rounded-lg shadow p-4 w-full ">
                <div className="flex justify-between">
                  <div>
                    <div className="font-bold text-purple-600">
                      {act.loai_hanh_dong}
                    </div>
                    <p>
                      <span className="font-semibold">Người thực hiện:</span>{" "}
                      {act.tai_khoan_ho_ten} ({act.tai_khoan_username})
                    </p>
                    <p>
                      <span className="font-semibold">
                        Thời điểm đăng nhập:
                      </span>{" "}
                      {new Date(act.thoi_diem_dang_nhap).toLocaleString(
                        "vi-VN"
                      )}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Thời gian thực hiện:
                      </span>{" "}
                      {new Date(act.thoi_gian_thuc_hien).toLocaleString(
                        "vi-VN"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
