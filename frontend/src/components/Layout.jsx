import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50 md:gap-2 md:p-2">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
