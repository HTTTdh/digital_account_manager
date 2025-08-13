import React, { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = "123";

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true);
        // TODO: Thay bằng call API thực tế
        // const res = await fetch(`/api/alerts?userId=${userId}`);
        // const data = await res.json();

        // Mock data ví dụ:
        const data = [
          {
            id: "alert1",
            message:
              "Tài sản Laptop Dell XPS 13 của bạn sẽ hết hạn vào 2023-09-30",
            date: "2023-08-20",
            isRead: false,
          },
          {
            id: "alert2",
            message: "Email Office 365 của bạn sẽ hết hạn vào 2023-10-15",
            date: "2023-08-10",
            isRead: true,
          },
        ];

        setAlerts(data);
      } catch (err) {
        setError("Không thể tải danh sách cảnh báo.");
      } finally {
        setLoading(false);
      }
    }

    fetchAlerts();
  }, [userId]);

  if (loading) return <div>Đang tải cảnh báo...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cảnh báo tài sản</h2>

      {alerts.length === 0 && <p>Bạn không có cảnh báo nào.</p>}

      <ul>
        {alerts.map(({ id, message, date, isRead }) => (
          <li
            key={id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: isRead ? "#f0f0f0" : "#fff4e5",
              borderLeft: isRead ? "4px solid #ccc" : "4px solid #ff9900",
              borderRadius: "4px",
            }}
          >
            <p>{message}</p>
            <small>Ngày cảnh báo: {new Date(date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alerts;
