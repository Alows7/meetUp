import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import AppRoutes from "./routes/AppRoutes";


export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </AuthProvider>
  );
}