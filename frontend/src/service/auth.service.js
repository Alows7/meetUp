import { apiClient } from "./apiClient.js";

export const login = (email, password) =>
  apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const register = (data) =>
  apiClient("/auth/register", { method: "POST", body: JSON.stringify(data) });

export const googleAuth = (data) =>
  apiClient("/auth/google", { method: "POST", body: JSON.stringify(data) });
