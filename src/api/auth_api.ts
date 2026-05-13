import { END_POINTS } from "@/const/endpoint";
import { Client, GetErrorMessage } from "./client";


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
    const response = await Client.post(END_POINTS.LOGIN, payload);
    return response.data;
  } catch (error) {
    throw new Error(GetErrorMessage(error));
  }
};

export const registerApi = async (payload: RegisterPayload) => {
  try {
    const response = await Client.post(END_POINTS.SIGNUP, payload);
    return response.data;
  } catch (error) {
    throw new Error(GetErrorMessage(error));
  }
};
