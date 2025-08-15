import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Home() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState({});

  useEffect(() => {
    async function fetchAssets() {
      try {
        setLoading(true);

        // Data CSV đã chuyển sang JSON
        const data = [
          {
            id: "asset1",
            name: "Google Workspace - Nguyễn Văn A",
            type: "Google Workspace",
            assignedDate: "2025-08-05",
            details: {
              "Tên đăng nhập": "kd01@company.com",
              "Mật khẩu": "pass123",
              "Mã FA": "fa_123",
              "Link đăng nhập": "https://mail.google.com",
              "Ngày cấp": "2025-08-05 00:00:00+07",
              "Ngày hết hạn": "2026-08-05 00:00:00+07",
              "Loại tài khoản": "Google Workspace",
              "Tên nhà cung cấp": "Google",
              "Họ tên người nhận": "Nguyễn Văn A",
              "Họ tên người đại diện": "Trần Thị B",
              "Phòng ban": "Phòng Kinh Doanh",
            },
          },
          {
            id: "asset2",
            name: "Facebook Ads - Trần Thị B",
            type: "Facebook Ads",
            assignedDate: "2025-08-06",
            details: {
              "Tên đăng nhập": "fb_ads01",
              "Mật khẩu": "fbpass",
              "Mã FA": "fbfa_456",
              "Link đăng nhập": "https://facebook.com/adsmanager",
              "Ngày cấp": "2025-08-06 00:00:00+07",
              "Ngày hết hạn": "2026-08-06 00:00:00+07",
              "Loại tài khoản": "Facebook Ads",
              "Tên nhà cung cấp": "Meta",
              "Họ tên người nhận": "Trần Thị B",
              "Họ tên người đại diện": "Lê Văn C",
              "Phòng ban": "Phòng Kinh Doanh",
            },
          },
          {
            id: "asset3",
            name: "AWS Cloud - Phạm Thị D",
            type: "AWS Cloud",
            assignedDate: "2025-08-07",
            details: {
              "Tên đăng nhập": "aws_root",
              "Mật khẩu": "awspass",
              "Mã FA": "awsfa_789",
              "Link đăng nhập": "https://console.aws.amazon.com",
              "Ngày cấp": "2025-08-07 00:00:00+07",
              "Ngày hết hạn": "2026-08-07 00:00:00+07",
              "Loại tài khoản": "AWS Cloud",
              "Tên nhà cung cấp": "Amazon Web Services",
              "Họ tên người nhận": "Phạm Thị D",
              "Họ tên người đại diện": "Hoàng Văn E",
              "Phòng ban": "Nhóm Hỗ Trợ",
            },
          },
        ];

        setAssets(data);
        setSelectedAsset(data[0] || null);
      } catch (err) {
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

  return (
    <div className="p-8 max-w-6xl mx-auto mt-10 font-sans bg-gray-50 rounded-lg shadow-lg flex gap-10">
      {/* Danh sách tài sản bên trái */}
      <div className="w-1/3 overflow-y-auto max-h-[600px] border-r pr-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">
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
              className={`p-4 rounded-lg cursor-pointer transition shadow-sm border
                ${
                  selectedAsset?.id === asset.id
                    ? "bg-blue-100 border-blue-600"
                    : "bg-white hover:bg-blue-50 border-gray-200"
                }`}
            >
              <p className="font-semibold">{asset.name}</p>
              <span className="text-sm text-gray-500">{asset.type}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chi tiết tài sản */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md max-h-[600px] overflow-y-auto">
        {selectedAsset ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {selectedAsset.name}
            </h2>
            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Loại tài sản: </span>
              {selectedAsset.type}
            </p>
            <p className="mb-4 text-gray-700 italic">
              Ngày cấp: {formatDate(selectedAsset.assignedDate)}
            </p>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Chi tiết tài sản
            </h3>
            <table className="w-full border-collapse">
              <tbody>
                {Object.entries(selectedAsset.details).map(([key, value]) => {
                  const isPassword = isPasswordKey(key);
                  const showPass = showPasswordFields[key] || false;
                  const isLink = isUrl(value);
                  const isDateField = !isNaN(new Date(value));

                  return (
                    <tr key={key} className="border-b">
                      <td className="font-semibold py-2 px-4 w-48 text-gray-700">
                        {key}
                      </td>
                      <td
                        className={`py-2 px-4 ${
                          isDateField && isExpired(value)
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
          </>
        ) : (
          <p className="text-gray-600">
            Vui lòng chọn một tài sản để xem chi tiết.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;

// Thêm 1 dropdown để khi click vào sẽ hiển thị chi tiết tài sản
