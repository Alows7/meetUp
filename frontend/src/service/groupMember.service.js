import { apiClient } from "./apiClient.js";

export const addMember = (groupMemberData) =>
  apiClient(`/groupMembers`, {
    method: "POST",
    body: JSON.stringify(groupMemberData),
  });

  
export const leaveGroup = () =>
  apiClient(`/groupMembers/leave`, {
    method: "DELETE"
  });

export const removeMember = (id) =>
  apiClient(`/groupMembers/remove/${id}`, {
    method: "DELETE"
  });

export const updateMember = (id, groupMemberData) =>
  apiClient(`/groupMembers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(groupMemberData),
  });

