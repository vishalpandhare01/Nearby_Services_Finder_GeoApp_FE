import { END_POINTS } from "@/const/endpoint";
import { Client, GetErrorMessage } from "./client";

export interface ServicePayload {
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  rating: number;
}


export const createService = async (payload: ServicePayload) => {
  try {
    const response = await Client.post(END_POINTS.SERVICE, payload);
    return response.data;
  } catch (error) {
    return new Error(GetErrorMessage(error));
  }
};

export const updateService = async (payload: ServicePayload , serviceId: string) => {
  try {
    const response = await Client.put(`${END_POINTS.SERVICE}${serviceId}`, payload);
    return response.data;
  } catch (error) {
    return new Error(GetErrorMessage(error));
  }
};

export const deleteService = async (serviceId: string) => {
  try {
    const response = await Client.delete(`${END_POINTS.SERVICE}${serviceId}`);
    return response.data;
  } catch (error) {
    return new Error(GetErrorMessage(error));
  }
};


export const getServiceList = async (
  latitude: string,
  longitude: string,
  radius: number,
  limit: number,
  page: number,
  category: string
) => {
  try {
    const response = await Client.get(END_POINTS.SERVICE, {
      params: {
        latitude,
        longitude,
        radius,
        limit,
        page,
        category,
      },
    });

    return response.data;
  } catch (error) {
    return new Error(GetErrorMessage(error));
  }
};

export const getAllServices = async () => {
  try {
    const response = await Client.get(END_POINTS.SERVICE + "my-services");
    return response.data;
  } catch (error) {
    return new Error(GetErrorMessage(error));
  }
};