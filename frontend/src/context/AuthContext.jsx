import { useState, createContext } from "react";
import {
  login as loginRequest,
  register as registerRequest,
  googleAuth as googleAuthRequest,
} from "../service/auth.service.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  function logOut() {
    setUser(null);
  }

  async function login(email, password) {
    const data = await loginRequest(email, password);
    setUser(data.user);
    setToken(data.token);
  }

  async function register(data) {
    const result = await registerRequest(data);
    setUser(result.user);
    setToken(result.token);
  }

  async function googleAuth(data) {
    const result = await googleAuthRequest(data);
    setUser(result.user);
    setToken(result.token);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logOut, register,googleAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
