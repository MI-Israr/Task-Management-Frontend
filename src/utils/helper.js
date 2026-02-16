import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// export const validatePassword = (password) => {
//   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+]).{8,}$/;
//   return regex.test(password);
// };

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const downloadExcelReport = async (apiPath, fileName) => {
  try {
    const response = await axiosInstance.get(apiPath, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Report downloaded successfully");
  } catch (error) {
    console.error("Error downloading report:", error);
    toast.error("Failed to download report. Please try again.");
  }
};
