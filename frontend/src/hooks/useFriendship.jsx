import { useEffect, useState } from "react";
import {
  createFriendship,
  getPendingRequests,
  respondToFriendship,
} from "../service/friendships.service";

export function useCreateFriendship() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function create(addresseeId) {
    setLoading(true);
    setError(null);

    try {
      const result = await createFriendship(addresseeId);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { create, error, loading };
}

export function useRespondToFriendship() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function respond(id, status) {
    setLoading(true);
    setError(null);
    try {
      const result = await respondToFriendship(id, status);
      return result;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { respond, error, loading };
}


export function useGetPendingRequests(){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([])

  useEffect(()=>{
    async function pendingRequest() {
      setLoading(false)
      setError(null)

      try {
        const result = await getPendingRequests()
        setData(result)
      } catch (err) {
        setError(err)
      }finally{
        setLoading(false)
      }
    }
  },[])
}