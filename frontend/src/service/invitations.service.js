import { apiClient } from "./apiClient.js";

export const createInvitation = (invitationData) =>
  apiClient("/invitations", {
    method: "POST",
    body: JSON.stringify(invitationData),
  });

export const getMyInvitations = () =>
  apiClient("/invitations", { method: "GET" });

export const getSentInvitationsForEvent = (eventId) =>
  apiClient(`/invitations/${eventId}/sent`, { method: "GET" });

export const deleteInvitation = (id) =>
  apiClient(`/invitations/${id}`, { method: "DELETE" });

export const getInvitation = (id) =>
  apiClient(`/invitations/${id}`, { method: "GET" });

export const respondToInvitation = (id, status) =>
  apiClient(`/invitations/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
