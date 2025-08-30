import { useEffect, useState } from "react";
import { AssetLoginInfoStore } from "../../stores/assetLoginInfo";
import { formatDateTime, formatDate } from "../../utils/formatDate";
import { X } from "lucide-react";
function Home() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState({});
  const [activeTab, setActiveTab] = useState("using");
  const assetLoginInfo = AssetLoginInfoStore();
  const [selectedItem, setSelectedItem] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    async function fetchAssets() {
      try {
        setLoading(true);
        const result = await assetLoginInfo.getAssetLoginInfoPrivate();
        const data = result?.value?.map((item) => ({
          taisan: item,
          id: item.id,
          name: `${item.ten_tai_san} - ${item.ho_ten_nguoi_nhan}`,
          type: item.ten_danh_muc_tai_san,
          assignedDate: item.ngay_cap,
          trang_thai: item.trang_thai,
          ngay_thu_hoi: item.ngay_thu_hoi,
          details: {
            ...item.thong_tin,
            "Trạng thái": item?.trang_thai,
            "Ngày thu hồi": item.ngay_thu_hoi
              ? new Date(item.ngay_thu_hoi).toLocaleDateString()
              : "Chưa thu hồi",
            "Tên nhà cung cấp": item.ten_nha_cung_cap,
            "Họ tên người nhận": item?.ho_ten_nguoi_nhan,
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

  const isUrl = (str) => typeof str === "string" && /^https?:\/\//.test(str);

  const isPasswordKey = (key) =>
    key.toLowerCase().includes("mật khẩu") ||
    key.toLowerCase().includes("password");

  const isDateFieldKey = (key, value) =>
    key.toLowerCase().includes("ngày") && !isNaN(new Date(value));

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

  return (
    <div className="p-6 max-w-6xl mx-auto mt-2 font-sans bg-gray-50 rounded-lg shadow-lg flex gap-10">
      {/* Danh sách tài sản bên trái */}
      <div className="w-1/3 overflow-y-auto max-h-[600px] border-r pr-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Danh sách tài sản
        </h2>

        {/* Tab lựa chọn */}
        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 py-2 rounded-lg font-medium ${activeTab === "using"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Đang sử dụng
          </button>
        </div>

        {/* Danh sách theo tab */}
        {assets.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            Không có tài sản nào trong mục này.
          </p>
        ) : (
          <ul className="space-y-3">
            {assets.map((asset, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedAsset(asset);
                  setShowPasswordFields({});
                }}
                className={`p-4 rounded-lg cursor-pointer transition shadow-sm border
                  ${selectedAsset?.id === asset?.id
                    ? "bg-blue-100 border-blue-600"
                    : "bg-white hover:bg-blue-50 border-gray-200"
                  }`}
              >
                <p className="font-semibold">{asset?.name}</p>
                <span className="text-sm text-gray-500">{asset?.type}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chi tiết tài sản */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md max-h-[600px] overflow-y-auto">
        {selectedAsset ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {selectedAsset?.name}
            </h2>
            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Loại tài sản: </span>
              {selectedAsset?.type}
            </p>
            <p className="mb-4 text-gray-700 italic">
              Ngày cấp: {formatDateTime(selectedAsset?.assignedDate)}
            </p>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Chi tiết tài sản
            </h3>
            <div className="space-y-2">
              {Object.entries(selectedAsset.details).map(([key, value]) => {
                const isPassword = isPasswordKey(key);
                const showPass = showPasswordFields[key] || false;
                const isLink = isUrl(value);
                const isDateField = isDateFieldKey(key, value);

                return (
                  <p
                    key={key}
                    className="break-words whitespace-pre-wrap text-gray-800"
                  >
                    <span className="font-semibold">{key}: </span>
                    {isPassword ? (
                      <span className="inline-flex items-center space-x-2">
                        <span>{showPass ? value : "••••••••"}</span>
                      </span>
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
                      <span className="text-gray-600">{formatDate(value)}</span>
                    ) : (
                      <span className="text-gray-600">{value}</span>
                    )}
                  </p>
                );
              })}
            </div>
            <button
              onClick={() => { setSelectedItem(selectedAsset) }}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4"
            >
              Sửa thông tin
            </button>
          </>
        ) : (
          <p className="text-gray-600">
            Vui lòng chọn một tài sản để xem chi tiết.
          </p>
        )}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] relative">
              <button
                onClick={() => { console.log("123"); setSelectedItem(null) }}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Chi tiết đăng nhập
              </h3>

              {/* Thông tin hiển thị, không sửa */}
              <div className="space-y-3 text-gray-700">
                <p><span className="font-semibold">Tài sản: </span>{selectedItem?.taisan.ten_tai_san}</p>
                <p><span className="font-semibold">Người nhận: </span>{selectedItem?.taisan.ho_ten_nguoi_nhan}</p>
                <p><span className="font-semibold">Người yêu cầu: </span>{selectedItem?.taisan.ho_ten_nguoi_yeu_cau}</p>
                <p><span className="font-semibold">Danh mục tài sản: </span>{selectedItem?.taisan.ten_danh_muc_tai_san}</p>
                <p><span className="font-semibold">Ngày cấp: </span>{formatDate(selectedItem?.taisan.ngay_cap)}</p>
                <p><span className="font-semibold">Ngày thu hồi: </span>{selectedItem?.taisan.ngay_thu_hoi
                  ? new Date(item.ngay_thu_hoi).toLocaleDateString()
                  : "Chưa thu hồi"}</p>
              </div>

              {/* Form sửa thông tin cấp phát */}
              <div className="mt-4 border-t pt-4">
                <h4 className="text-lg font-semibold mb-2">Thông tin cấp phát:</h4>
                <div className="space-y-2">
                  {Object.entries(selectedItem?.taisan.thong_tin || {}).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <label className="font-semibold">{key}</label>
                      {key === "password" ? (
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="border rounded p-2 text-gray-700"
                          placeholder="Nhập mật khẩu mới"
                        />
                      ) : (
                        <input
                          type="text"
                          value={selectedItem.taisan.thong_tin[key] ?? ""}
                          onChange={(e) =>
                            setSelectedItem((prev) => ({
                              ...prev,
                              taisan: {
                                ...prev.taisan,
                                thong_tin: {
                                  ...prev.taisan.thong_tin,
                                  [key]: e.target.value,
                                },
                              },
                            }))
                          }
                          className="border rounded p-2 text-gray-700"
                        />
                      )}

                    </div>
                  ))}


                </div>
              </div>

              {/* Nút hành động */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 border rounded"
                >
                  Đóng
                </button>
                <button
                  onClick={async () => {
                    try {
                      await assetLoginInfo.updateAssetLoginInfo(
                        selectedItem.taisan.id,
                        selectedItem.taisan,
                        {
                          ...selectedItem.taisan,
                          thong_tin: {
                            ...selectedItem.taisan.thong_tin,
                            password: newPassword || selectedItem.taisan.thong_tin.password,
                          },
                        }
                      );
                      setSelectedItem(null);
                      alert("Update thành công")
                      // refresh lại list asset
                      const refreshed = await assetLoginInfo.getAssetLoginInfoPrivate();
                      setAssets(refreshed.value.map((item) => ({
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
                      })));
                    } catch (err) {
                      console.error("Update failed:", err);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
