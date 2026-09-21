import { useState } from "react";
import {
  addMember,
  leaveGroup,
  updateMember,
} from "../service/groupMember.service.js";

export function useAddMember() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function create(groupMemberData) {
    setError(null);
    setLoading(true);
    try {
      const result = await addMember(groupMemberData);
      return result;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return { loading, error, create };
}

export function useLeaveGroup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function leave() {
    setError(null);
    setLoading(false);

    try {
      await leaveGroup();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return { leave, loading, error };
}

export function useUpdateMember() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function update() {
    setError(null);
    setLoading(false);

    try {
      const result = await updateMember();
      return result;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return { update, loading, error };
}
