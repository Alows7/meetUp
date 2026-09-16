import { useState, useEffect } from "react";
import {
  getPublicEvents,
  getEvent,
  getMyInvitedEvents,
  getMyCreatedEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../service/events.service.js";

export function useCreateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(eventData) {
    setError(null);
    setLoading(true);
    try {
      const result = await createEvent(eventData);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return { submit, loading, error };
}

export function useDeleteEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(id) {
    setLoading(true);
    setError(null);
    try {
      await deleteEvent(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error };
}

export function useEventById(id) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      setData({});
      const result = await getEvent(id);
      setData(result);
      setLoading(false);
    }
    fetchEvent();
  }, [id]);

  return { data, loading };
}

export function useMyCreatedEvents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const result = await getMyCreatedEvents();
      setData(result);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return { data, loading };
}

export function useMyInvitedEvents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const result = await getMyInvitedEvents();
      setData(result);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return { data, loading };
}

export function usePublicEvents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublicEvents() {
      const result = await getPublicEvents();
      setData(result);
      setLoading(false);
    }
    fetchPublicEvents();
  }, []);

  return { data, loading };
}

export function useUpdateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function submit(id, eventData) {
    setLoading(true);
    setError(null);
    try {
      const result = await updateEvent(id, eventData);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error };
}
