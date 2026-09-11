import { apiClient } from "./apiClient.js";

export const getMyGroups = () => apiClient("/groups", { method: "GET" });

export const createGroup = (groupdata) =>
  apiClient("/groups", { method: "POST", body: JSON.stringify(groupdata) });

export const getGroup = (id) => apiClient("/groups/" + id, { method: "GET" });

export const updateGroup = (id, groupData) =>
  apiClient("/groups/" + id, {
    method: "PATCH",
    body: JSON.stringify(groupData),
  });

export const deleteGroup = (id) =>
  apiClient("/groups/" + id, { method: "DELETE" });

// export const getMessagesByGroup = (groupId) =>
//   apiClient(`/groups/${groupId}/messages`, { method: "GET" });
