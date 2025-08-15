import React, { useState } from "react";

const assetsData = [
  {
    id: 101,
    name: "Hosting",
    details: [
      { id: 1001, name: "hosting1.pavietnam.vn" },
      { id: 1002, name: "hosting2.pavietnam.vn" },
      { id: 1005, name: "hosting3.pavietnam.vn" },
      { id: 1006, name: "hosting4.pavietnam.vn" },
    ],
  },
  {
    id: 102,
    name: "Domain",
    details: [
      { id: 1003, name: "mywebsite.com" },
      { id: 1004, name: "shoponline.vn" },
      { id: 1005, name: "hoang.dev" },
    ],
  },
  {
    id: 103,
    name: "Fanpage",
    details: [
      { id: 1006, name: "facebook.com/pavietnam" },
      { id: 1007, name: "facebook.com/pavietnam-support" },
    ],
  },
  {
    id: 201,
    name: "Email",
    details: [
      { id: 2001, name: "support@company.com" },
      { id: 2002, name: "sales@company.com" },
    ],
  },
  {
    id: 202,
    name: "Drive",
    details: [
      { id: 2003, name: "Drive Project A" },
      { id: 2004, name: "Drive Project B" },
    ],
  },
];

function RequestAccountForm() {
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedDetail, setSelectedDetail] = useState("");
  const [details, setDetails] = useState([]);
  const [description, setDescription] = useState("");

  const handleAssetChange = (e) => {
    const assetId = Number(e.target.value);
    setSelectedAsset(assetId);
    setSelectedDetail("");
    const asset = assetsData.find((a) => a.id === assetId);
    setDetails(asset ? asset.details : []);
  };

  const handleDetailSelect = (detailId) => {
    setSelectedDetail(detailId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAsset || !selectedDetail || !description) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const requestData = {
      assetId: selectedAsset,
      detailId: selectedDetail,
      description,
    };

    console.log("Dữ liệu gửi:", requestData);
    alert("Gửi yêu cầu thành công!");
  };

  return (
    <div className="mx-8" style={{ display: "flex" }}>
      {/* Cột trái: danh sách chi tiết tài sản */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
          Yêu cầu cấp tài sản
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Danh mục tài sản*/}
          <label className="block font-medium mb-1">Danh mục tài sản *</label>
          <select
            value={selectedAsset}
            onChange={handleAssetChange}
            className="w-1/2 p-2 border rounded mb-4"
          >
            <option value="">-- Chọn Danh mục tài sản --</option>
            {assetsData.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>

          {/* Nội dung yêu cầu */}
          <label className="block font-medium mb-1">Nội dung ghi chú *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-4 h-40"
            placeholder="Mô tả Nội dung ghi chú ..."
          />

          {/* Nút gửi */}
          <button
            type="submit"
            className="w-1/4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer"
          >
            Gửi yêu cầu
          </button>
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
        {!details.length ? (
          <p style={{ fontSize: "14px", color: "#888" }}>
            Chọn loại tài sản để xem danh sách
          </p>
        ) : (
          details.map((d) => (
            <label
              key={d.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 0",
                cursor: "pointer",
                background: selectedDetail === d.id ? "#e0f0ff" : "transparent",
                borderRadius: "4px",
              }}
            >
              <input
                type="radio"
                name="detail"
                checked={selectedDetail === d.id}
                onChange={() => handleDetailSelect(d.id)}
                style={{ marginRight: "8px" }}
              />
              {d.name}
            </label>
          ))
        )}
      </div>

      {/* Cột phải: form */}
    </div>
  );
}

export default RequestAccountForm;

// Mỗi tài sản sẽ có những thông tin chi tiết khác nhau Nên sẽ có 1 cột động
