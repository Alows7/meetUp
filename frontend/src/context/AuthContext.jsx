import { useState, useEffect, createContext } from "react";
import {
  login as loginRequest,
  register as registerRequest,
  googleAuth as googleAuthRequest,
} from "../service/auth.service.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  function persistSession(data) {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  function logOut() {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async function login(email, password) {
    const data = await loginRequest(email, password);
    persistSession(data);
  }

  async function register(data) {
    const result = await registerRequest(data);
    persistSession(result);
  }

  async function googleAuth(data) {
    const result = await googleAuthRequest(data);
    persistSession(result);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logOut, register, googleAuth }}>
      {children}
    </AuthContext.Provider>
  );
}