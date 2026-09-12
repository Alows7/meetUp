import { apiClient } from "./apiClient.js";

export const createAnnouncement = (data) =>
  apiClient("/announcements", { method: "POST", body: JSON.stringify(data) });

export const getAnnouncements = () =>
  apiClient("/announcements", { method: "GET" });

export const getAnnouncement = (id) =>
  apiClient(`/announcements/${id}`, { method: "GET" });

export const updateAnnouncement = (id, data) =>
  apiClient(`/announcements/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteAnnouncement = (id) =>
  apiClient(`/announcements/${id}`, { method: "DELETE" });

export const getAnnouncementsByEvent = (eventId) =>
  apiClient(`/announcements/${eventId}`, { method: "GET" });
