import { useEffect, useState } from "react";
import { CategoryStore } from "../../stores/category";
import { AssetStore } from "../../stores/asset";
import { DepartmentStore } from "../../stores/department";
import axios from "axios";

function RequestAsset() {
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedDetail, setSelectedDetail] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [details, setDetails] = useState([]);
  const [description, setDescription] = useState("");
  const category = CategoryStore();
  const asset = AssetStore();
  const department = DepartmentStore();

  const handleAssetChange = async (e) => {
    const assetId = Number(e.target.value);
    setSelectedAsset(assetId);
    const taiSan = await asset.getAssetByIdCategory(assetId);
    setDetails(taiSan);
    setSelectedDetail("");
  };

  const selectedAssetDetail = details.find(
    (item) => item.id === selectedDetail
  );

  const handleDetailSelect = (detailId) => setSelectedDetail(detailId);
  const handleEmployeeChange = (e) =>
    setSelectedEmployee(Number(e.target.value));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDetail || !description || !selectedEmployee) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const requestData = {
      TaiSanId: selectedDetail,
      noi_dung: description,
      nguoi_nhan_id: selectedEmployee,
    };
    try {
      const response = await axios.post(
        "https://taisanso.tmedu.vn/api/admin/yeu_cau",
        requestData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.status === true) {
        setSelectedAsset("");
        setSelectedDetail("");
        setDescription("");
        setSelectedEmployee("");
        alert("Gửi yêu cầu thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error.response || error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await category.getAllCategory();
      await department.getUserByDepartment();
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto my-6 space-y-6">
      <h2 className="text-center text-2xl font-bold mb-4">
        Yêu cầu cấp tài sản
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Form yêu cầu */}
        <div className="md:flex-1 bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                Danh mục tài sản *
              </label>
              <select
                value={selectedAsset}
                onChange={handleAssetChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Chọn Danh mục tài sản --</option>
                {category.data?.data?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.ten}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">
                Chọn nhân viên *
              </label>
              <select
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Chọn Nhân viên --</option>
                {department?.data?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.ho_ten}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">
                Nội dung ghi chú *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md h-28 focus:ring-2 focus:ring-blue-400"
                placeholder="Mô tả Nội dung ghi chú ..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md transform transition-all hover:from-blue-600 hover:to-indigo-600 hover:scale-105 active:scale-95"
            >
              Gửi yêu cầu
            </button>
          </form>
        </div>

        {/* Danh sách tài sản */}
        <div className="md:w-1/3 bg-white p-6 rounded-xl shadow-md overflow-y-auto max-h-[600px]">
          <h3 className="font-semibold mb-3">Danh sách tài sản</h3>
          {details?.length === 0 ? (
            <p className="text-gray-500 text-sm">Không có tài sản nào</p>
          ) : (
            <ul className="space-y-2">
              {details.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center p-2 rounded-md cursor-pointer transition ${selectedDetail === item.id
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : "hover:bg-gray-50"
                    }`}
                  onClick={() => handleDetailSelect(item.id)}
                >
                  {item.ten_tai_san}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chi tiết tài sản */}
        <div className="md:flex-1 bg-white p-6 rounded-xl shadow-md overflow-y-auto max-h-[600px]">
          <h3 className="font-semibold mb-3">Chi tiết tài sản</h3>
          {!selectedDetail ? (
            <p className="text-gray-500 text-sm">
              Vui lòng chọn một tài sản để xem chi tiết
            </p>
          ) : (
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Tên tài sản: </span>
                {selectedAssetDetail?.ten_tai_san}
              </p>
              <p>
                <span className="font-semibold">Nhà cung cấp: </span>
                {selectedAssetDetail?.ten_nha_cung_cap}
              </p>
              <p>
                <span className="font-semibold">Danh mục: </span>
                {selectedAssetDetail?.danh_muc_tai_san_ten}
              </p>
              <p>
                <span className="font-semibold">Số lượng còn: </span>
                {selectedAssetDetail?.so_luong_con}
              </p>
              <p>
                <span className="font-semibold">Tổng số lượng: </span>
                {selectedAssetDetail?.tong_so_luong}
              </p>
              <p>
                <span className="font-semibold">Liên hệ: </span>
                {selectedAssetDetail?.danh_muc_tai_san_lien_he}
              </p>
              {selectedAssetDetail?.danh_muc_tai_san_link && (
                <p>
                  <span className="font-semibold">Link: </span>
                  <a
                    href={selectedAssetDetail.danh_muc_tai_san_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {selectedAssetDetail.danh_muc_tai_san_link}
                  </a>
                </p>
              )}
              {selectedAssetDetail?.thong_tin && (
                <div className="mt-3">
                  <span className="font-semibold block mb-1">
                    Thông số kỹ thuật:
                  </span>
                  <ul className="list-disc list-inside text-sm">
                    {Object.entries(selectedAssetDetail.thong_tin).map(
                      ([key, value], i) => (
                        <li key={i}>
                          <span className="font-medium">{key}:</span> {value}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestAsset;
