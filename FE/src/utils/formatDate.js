const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Nếu giờ và phút đều = 0 thì chỉ hiển thị ngày/tháng/năm
  if (hours === 0 && minutes === 0) {
    return `${day}/${month}/${year}`;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${day}/${month}/${year}`;
};

export default formatDate;