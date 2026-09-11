import { apiClient } from "./apiClient.js";

export const createFriendship = (addresseeId) =>
  apiClient("/friendships", {
    method: "POST",
    body: JSON.stringify({ addresseeId }),
  });

export const getPendingRequests = () => apiClient("/friendships/pending");

export const getFriends = () =>
  apiClient("/friendships/friends", {
    method: "GET",
  });

export const getFriendship = (id) =>
  apiClient("/friendships/" + id, {
    method: "GET",
  });

export const deleteFriendship = (id) =>
  apiClient("/friendships/" + id, {
    method: "DELETE",
  });

export const respondToFriendship = (id, status) =>
  apiClient("/friendships/" + id, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
