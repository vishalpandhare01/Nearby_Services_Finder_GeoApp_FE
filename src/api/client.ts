import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASEURL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BASE_API_URL ||
  "";

export const Client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

export const GetErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message || error.response?.data?.error || error.message || "Unable to connect to server"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
};