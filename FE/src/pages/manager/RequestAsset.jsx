import { useEffect, useState } from "react";
import { CategoryStore } from "../../stores/category";
import { AssetStore } from "../../stores/asset";
import { DepartmentStore } from "../../stores/department";
import axios from "axios";

function RequestAccountForm() {
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

  const handleDetailSelect = (detailId) => {
    setSelectedDetail(detailId);
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(Number(e.target.value));
  };

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
        "http://localhost:8080/api/admin/yeu_cau",
        requestData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Phản hồi từ server:", response.data);
      if (response.data.status == true) {
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
  // console.log(department.data);

  // console.log(category.data);

  return (
    <div className="my-4">
      <h2
        className="text-center"
        style={{ fontWeight: "bold", fontSize: "20px" }}
      >
        Yêu cầu cấp tài sản
      </h2>
      <div className="mx-8" style={{ display: "flex" }}>
        {/* Cột trái: danh sách chi tiết tài sản */}
        <div style={{ flex: 1, padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            {/* Danh mục tài sản*/}
            <label className="block font-medium mb-1">Danh mục tài sản *</label>
            <select
              value={selectedAsset}
              onChange={handleAssetChange}
              className="w-1/2 p-2 border rounded mb-4"
            >
              <option value="">-- Chọn Danh mục tài sản --</option>
              {category.data?.data?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.ten}
                </option>
              ))}
            </select>

            <label className="block font-medium mb-1">Chọn nhân viên *</label>

            <select
              value={selectedEmployee}
              onChange={handleEmployeeChange}
              className="w-1/2 p-2 border rounded mb-4"
            >
              <option value="">-- Chọn Nhân viên --</option>
              {department?.data?.map((item, index) => (
                <option key={index} value={item?.id}>
                  {item.ho_ten}
                </option>
              ))}
            </select>

            {/* Nội dung yêu cầu */}
            <label className="block font-medium mb-1">Nội dung ghi chú *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-1/2 p-2 border rounded mb-4 h-40"
              placeholder="Mô tả Nội dung ghi chú ..."
            />

            <div>
              <button
                type="submit"
                className="hover:cursor-pointer w-1/3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 
             text-white font-semibold shadow-md transform transition-all 
             hover:from-blue-600 hover:to-indigo-600 hover:scale-105 
             active:scale-95"
              >
                Gửi yêu cầu
              </button>
            </div>
          </form>
        </div>
        <div
          className="w-2/5"
          style={{
            borderRight: "1px solid #ccc",
            padding: "10px",
            overflowY: "auto",
          }}
        >
          <h3>Danh sách tài sản</h3>
          {details.length == 0 ? (
            <p style={{ fontSize: "14px", color: "#888" }}>
              Không có tài sản nào
            </p>
          ) : (
            details.map((item, index) => (
              <label
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 0",
                  cursor: "pointer",
                  background:
                    selectedDetail === item.id ? "#e0f0ff" : "transparent",
                  borderRadius: "4px",
                }}
              >
                <input
                  type="radio"
                  name="detail"
                  checked={selectedDetail === item.id}
                  onChange={() => handleDetailSelect(item.id)}
                  style={{ marginRight: "8px" }}
                />
                {item.ten_tai_san}
              </label>
            ))
          )}
        </div>

        {/* Cột phải: form */}
      </div>
    </div>
  );
}

export default RequestAccountForm;

// Mỗi tài sản sẽ có những thông tin chi tiết khác nhau Nên sẽ có 1 cột động
