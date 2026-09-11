import { apiClient } from "./apiClient.js";

export const createMessage = (messageData) =>
  apiClient(`/messages`, { method: "POST", body: JSON.stringify(messageData) });

export const getMessages = (groupId) =>
  apiClient(`/messages/${groupId}`, { method: "GET" });

export const updateMessage = (id, messageData) =>
  apiClient(`/messages/${id}`, {
    method: "PATCH",
    body: JSON.stringify(messageData),
  });

export const deleteMessage = (id) =>
  apiClient(`/messages/${id}`, { method: "POST" });
