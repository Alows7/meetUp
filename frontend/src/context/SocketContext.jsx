import { useEffect, createContext, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/UseAuth";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const { token } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) return;
    const newSocket = io(API_URL, {
      auth: { token },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => console.log("Connected to socket server"));
    newSocket.on("disconnect", () =>
      console.log("Disconnected to socket server"),
    );

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [token, API_URL]);

  return (
    <SocketContext.Provider value={{ socket, token }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
