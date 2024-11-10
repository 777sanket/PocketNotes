function formatDate(dateString) {
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  const Day = date.getDate();
  const Month = date.toLocaleString("en-IN", { month: "short" });
  const Year = date.getFullYear();
  return `${Day} ${Month} ${Year}`;
}


function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export { formatDate, formatTime };