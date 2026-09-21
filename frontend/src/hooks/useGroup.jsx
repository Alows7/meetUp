import { useEffect, useState } from "react";
import {
  createGroup,
  getGroup,
  getMyGroups,
} from "../service/groups.service.js";

export function useCreateGroup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function create(groupData) {
    setError(null);
    setLoading(true);

    try {
      const result = await createGroup(groupData);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return { create, error, loading };
}

export function useGetMyGroups() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyGroup() {
      setError(null);
      setLoading(true);

      try {
        const result = await getMyGroups();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMyGroup();
  }, []);
  return { data, error, loading };
}

export function useGetGroup(id) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroup() {
      setError(null);
      setLoading(true);
      try {
        const result = await getGroup(id);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGroup();
  }, [id]);
  return { data, error, loading };
}