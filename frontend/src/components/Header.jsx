import { Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import NotificationPop from "./NotificationPop";

export default function Header() {
  const initials = "AK";

  return (
    <>
      {/* Desktop */}
      <header className="sticky top-0 z-10 hidden items-center justify-between border-b border-slate-300 bg-slate-50 px-6 py-3 md:flex">
        <div className="flex w-96 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-inset ring-slate-100">
          <Search size={18} className="text-gray-400" />
          <input type="text" placeholder="Rechercher une sortie, un ami..." className="w-full bg-transparent text-sm outline-none" />
        </div>
        <div className="flex items-center gap-4">
          <NotificationPop />
          <Link to="/profil" aria-label="Profil" className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-600 text-sm font-medium text-white">
            {initials}
          </Link>
        </div>
      </header>

      {/* Mobile */}
      <header className="flex items-center justify-between border-b border-slate-300 bg-slate-50 px-4 py-3 md:hidden">
        <div>
          <div className="text-2xl font-bold text-orange-500" style={{ fontFamily: "var(--font-logo)" }}>
            <span className="text-black">meet</span>
            <span className="underline decoration-2 underline-offset-4">Up</span>
          </div>
          <div className="text-[10px] tracking-wide text-gray-400">TA PROCHAINE SORTIE COMMENCE ICI</div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/notifications" aria-label="Notifications" className="flex h-8 w-8 items-center justify-center rounded-lg border border-orange-100 bg-orange-50">
            <Bell size={18} className="text-orange-600" />
          </Link>
          <Link to="/profil" aria-label="Profil" className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-800 text-xs font-medium text-white">
            {initials}
          </Link>
        </div>
      </header>
    </>
  );
}