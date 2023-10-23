import { apiClient } from "./ApiClient";

export const executeGoogleOauth = async () => {
  const response = await apiClient.get("/login");
  return response.data;
};

export const checkGoogleOauth = async () => {
  const response = await apiClient.get("/check-login");
  return response.data;
};
