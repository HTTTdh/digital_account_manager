import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";

function MyAsset() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState({});
  const assetLoginInfo = AssetLoginInfoStore();

  useEffect(() => {
    async function fetchAssets() {
      try {
        setLoading(true);
        const result = await assetLoginInfo.getAssetLoginInfoPrivate();
        const data = result?.value?.map((item) => ({
          id: item.id,
          name: `${item.ten_tai_san} - ${item.ho_ten_nguoi_nhan}`,
          type: item.ten_danh_muc_tai_san,
          assignedDate: item.ngay_cap,
          details: {
            ...item.thong_tin,
            "Trạng thái": item.trang_thai,
            "Ngày thu hồi": item.ngay_thu_hoi
              ? new Date(item.ngay_thu_hoi).toLocaleDateString()
              : "Chưa thu hồi",
            "Tên nhà cung cấp": item.ten_nha_cung_cap,
            "Họ tên người nhận": item.ho_ten_nguoi_nhan,
            "Họ tên người yêu cầu": item.ho_ten_nguoi_yeu_cau,
            "Phòng ban": item.ten_phong_ban,
          },
        }));
        setAssets(data);
        setSelectedAsset(data[0] || null);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách tài sản.");
      } finally {
        setLoading(false);
      }
    }
    fetchAssets();
  }, []);

  const togglePasswordVisibility = (key) => {
    setShowPasswordFields((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isUrl = (str) => typeof str === "string" && /^https?:\/\//.test(str);
  const isPasswordKey = (key) =>
    key.toLowerCase().includes("mật khẩu") ||
    key.toLowerCase().includes("password");

  const formatDate = (str) => {
    const d = new Date(str);
    if (!isNaN(d)) return d.toLocaleDateString();
    return str;
  };

  const isExpired = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    return !isNaN(date) && date < now;
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-xl text-gray-600">
        Đang tải tài sản...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center mt-10 font-bold">{error}</div>
    );
  if (assets.length === 0)
    return (
      <div className="text-center mt-10 text-xl text-gray-600">
        Hiện tại chưa có tài sản nào được cấp.
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto mt-6 font-sans flex gap-8 flex-col md:flex-row">
      {/* Danh sách tài sản */}
      <div className="md:w-1/3 bg-white rounded-xl shadow-md overflow-y-auto max-h-[600px] p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
          Danh sách tài sản
        </h2>
        <ul className="space-y-3">
          {assets.map((asset) => (
            <li
              key={asset.id}
              onClick={() => {
                setSelectedAsset(asset);
                setShowPasswordFields({});
              }}
              className={`p-3 rounded-lg cursor-pointer transition transform border
                ${selectedAsset?.id === asset.id
                  ? "bg-blue-100 border-blue-500 shadow-inner scale-105"
                  : "bg-white hover:bg-blue-50 border-gray-200 hover:shadow-sm"
                }`}
            >
              <p className="font-semibold text-gray-800">{asset.name}</p>
              <span className="text-sm text-gray-500">{asset.type}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chi tiết tài sản */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-md max-h-[600px] overflow-y-auto">
        {selectedAsset ? (
          <>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">
              {selectedAsset.name}
            </h2>
            <div className="flex flex-wrap gap-4 mb-4 text-gray-700">
              <p className="bg-gray-50 rounded-lg px-3 py-2">
                <span className="font-semibold">Loại tài sản: </span>
                {selectedAsset.type}
              </p>
              <p className="bg-gray-50 rounded-lg px-3 py-2 italic">
                Ngày cấp: {formatDate(selectedAsset.assignedDate)}
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Chi tiết tài sản
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {Object.entries(selectedAsset.details).map(([key, value]) => {
                    const isPassword = isPasswordKey(key);
                    const showPass = showPasswordFields[key] || false;
                    const isLink = isUrl(value);
                    const isDateField = !isNaN(new Date(value));

                    return (
                      <tr key={key} className="border-b hover:bg-gray-50 transition">
                        <td className="font-semibold py-2 px-4 w-48 text-gray-700">
                          {key}
                        </td>
                        <td
                          className={`py-2 px-4 ${isDateField && isExpired(value)
                            ? "text-red-600 font-semibold"
                            : "text-gray-800"
                            }`}
                        >
                          {isPassword ? (
                            <div className="inline-flex items-center space-x-2">
                              <span>{showPass ? value : "••••••••"}</span>
                              <button
                                onClick={() => togglePasswordVisibility(key)}
                                className="text-blue-500 hover:text-blue-700"
                                type="button"
                              >
                                {showPass ? (
                                  <AiOutlineEye className="text-black" />
                                ) : (
                                  <AiOutlineEyeInvisible className="text-black" />
                                )}
                              </button>
                            </div>
                          ) : isLink ? (
                            <a
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline break-all"
                            >
                              {value}
                            </a>
                          ) : isDateField ? (
                            formatDate(value)
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Vui lòng chọn một tài sản để xem chi tiết.</p>
        )}
      </div>
    </div>
  );
}

export default MyAsset;
