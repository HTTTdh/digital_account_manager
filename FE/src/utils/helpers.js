export function cn(...inputs) {
  return inputs
    .filter(Boolean) // Loại bỏ null, undefined, false, ''
    .join(" "); // Ghép lại thành chuỗi
}

export function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formatDateTime(date) {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTrangThaiBadgeColor(trangThai) {
  switch (trangThai?.toLowerCase()) {
    case "chờ duyệt":
      return "bg-yellow-100 text-yellow-800";
    case "đã duyệt":
      return "bg-green-100 text-green-800";
    case "từ chối":
      return "bg-red-100 text-red-800";
    case "hoàn thành":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function toConfigJSON(data, pretty = false) {
  try {
    if (pretty) {
      return JSON.stringify(data, null, 2);
    }
    return JSON.stringify(data);
  } catch (error) {
    console.error("Lỗi khi convert sang JSON:", error);
    return null;
  }
}
