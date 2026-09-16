import { useState, useEffect } from "react";
import { createMessage, deleteMessage, getMessages, updateMessage } from "../service/message.service.js";


export function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function sendMessage(messageData) {
    setError(null);
    setLoading(true);
    try {
      const result = await createMessage(messageData);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { sendMessage, error, loading };
}

export function useGetMessagesByGroup(groupId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getGroupMessages() {
      setLoading(true);
      setError(null);
      try {
        const result = await getMessages(groupId);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getGroupMessages();
  }, [groupId]);

  return { data, error, loading };
}

export function useUpdateMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function update(id, messageData) {
    setError(null);
    setLoading(true);
    try {
      const result = await updateMessage(id, messageData); 
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { update, error, loading };
}


export function useDeleteMessage() {  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function removeMessage(id) {  
    setError(null);
    setLoading(true);
    try {
      await deleteMessage(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { removeMessage, error, loading };
}