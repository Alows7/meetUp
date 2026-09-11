import { apiClient } from "./apiClient.js";

export const createEvent = (eventData) => {
  return apiClient("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
};

export const getEvents = () => {
  return apiClient("/events", { method: "GET" });
};

export const getMyCreatedEvents = () => {
  return apiClient("/events/created", { method: "GET" });
};

export const getMyInvitedEvents = () => {
  return apiClient("/events/invited", { method: "GET" });
};

export const getPublicEvents = () => {
  return apiClient("/events/public", { method: "GET" });
};

export const deleteEvent = (id) => {
  return apiClient(`/events/${id}`, { method: "DELETE" });
};

// export const getAnnouncementsByEvent = (eventId) => {
//   return apiClient(`/events/${eventId}/announcements`);
// };

export const updateEvent = (id, eventData) => {
  return apiClient(`/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(eventData),
  });
};

export const getEvent = (id) => {
  return apiClient(`/events/${id}`, { method: "GET" });
};
