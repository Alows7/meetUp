import { useEffect, useState } from "react";
import {
  createAnnouncement,
  getAnnouncement,
  getAnnouncementsByEvent,
} from "../service/announcements.service.js";

export function useCreateAnnouncement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function create(announcementData) {
    setError(null);
    setLoading(true);
    try {
      const result = await createAnnouncement(announcementData);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { create, loading, error };
}

export function useGetAnnouncement(id) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function get() {
      setLoading(true);
      setError(null);
      try {
        const result = await getAnnouncement(id);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    get();
  }, [id]);

  return { data, error, loading };
}

export function useGetAnnouncementByEvent(eventId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function get() {
      setLoading(true);
      setError(null);
      try {
        const result = await getAnnouncementsByEvent(eventId);
        setData(result);
      } catch (err) {
        setError(err);
      }finally{
        setLoading(false)
      }
    }
    get()
  }, [eventId]);

  return {data, error, loading}
}
