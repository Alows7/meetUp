import { useEffect, useState } from "react";
import {
  createInvitation,
  getInvitation,
  getMyInvitations,
  getSentInvitationsForEvent,
  respondToInvitation,
} from "../service/invitations.service.js";

export function useCreateInvitation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function create(invitationData) {
    setError(null);
    setLoading(true);
    try {
      const result = await createInvitation(invitationData);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return { create, error, loading };
}
export function useGetSentInvitations(eventId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchSent() {
      setLoading(true);
      setError(null);
      try {
        const result = await getSentInvitationsForEvent(eventId);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSent();
  }, [eventId]); // eventId en dépendance, comme pour useEventById
  return { data, error, loading };
}
export function useGetInvitation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  async function get(id) {
    setError(null);
    setLoading(true);
    try {
      const result = await getInvitation(id);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return { get, error, loading };
}
export function useRespondToInvitation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function respond(id, status) {
    setError(null);
    setLoading(true);
    try {
      const result = await respondToInvitation(id, status);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return { respond, error, loading };
}
export function useGetMyInvitations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([])
  useEffect(() => {
    async function get() {
      setError(null);
      setLoading(true);
      try {
        const result = await getMyInvitations();
        setData(result)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    get()
  }, []);
  return { data, error, loading };
}
