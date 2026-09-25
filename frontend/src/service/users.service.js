import { apiClient } from "./apiClient.js";

export const getUser = (id) => {
  return apiClient(`/user/${id}`, { method: "GET" });
};
export const deleteUser = (id) => {
  return apiClient(`/user/${id}`, { method: "DELETE" });
};
