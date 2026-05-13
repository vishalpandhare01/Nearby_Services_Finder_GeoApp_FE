import axios from "axios";
import { END_POINTS } from "@/const/endpoint";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASEURL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.BASE_API_URL ||
  "";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const getErrorMessage = (error: unknown) => {
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

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  role: string;
}

export const loginApi = async (payload: LoginPayload) => {
  try {
    const response = await client.post(END_POINTS.LOGIN, payload);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const registerApi = async (payload: RegisterPayload) => {
  try {
    const response = await client.post(END_POINTS.SIGNUP, payload);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
