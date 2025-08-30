import axiosConfig from "../axiosConfig";

export const getActivityHistory = async (filters, page) => {
  const params = { ...filters, page };
  // Tạo URL query string từ params
  const query = new URLSearchParams(params).toString();
  const url = `/admin/hanh_dong?${query}`;
  return await axiosConfig({
    method: "get",
    url,
  });
};
