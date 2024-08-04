const generateId = (length: number = 10): string => {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
};
const formatDate = (date: string): string => {
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid Date");
    }
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Invalid date format", error);
    return "";
  }
};
const getRelativeTime = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const timeUnits = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (const unit of timeUnits) {
    const count = Math.floor(diffInSeconds / unit.seconds);
    if (count >= 1) {
      return `${count} ${unit.name}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

const extractTextFromHTML = (html: string): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || "";
};
export { generateId, getRelativeTime, extractTextFromHTML, formatDate };
