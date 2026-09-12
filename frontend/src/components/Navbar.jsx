import { Link, NavLink } from "react-router-dom";
import { Home, Calendar, MessageCircle, Plus } from "lucide-react";

const links = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/mes-sorties", label: "Mes sorties", icon: Calendar},
  { to: "/discussions", label: "Discussions", icon: MessageCircle },
];

export default function Navbar() {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:sticky md:top-2 md:flex md:flex-col w-60 h-[calc(100vh-2rem)] shrink-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="text-2xl text-orange-500 mb-6 mt-2 font-extrabold " style={{ fontFamily: "var(--font-logo)" }}><span className="text-black ">meet</span><span className="text-3xl underline decoration-2 underline-offset-4">Up</span></div>
          <nav className="flex flex-col gap-2">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center text-[0.9em] justify-between px-3 py-2 rounded-lg transition ${
                    isActive ? "bg-orange-50 text-orange-600 font-medium" : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <Icon size={16} />
                  {label}
                </span>
                
              </NavLink>
            ))}
          </nav>
          <Link to="/nouvelle-sortie" className="mt-4 flex w-full text-[0.9em] items-center justify-center gap-2 rounded-lg bg-orange-500 py-2 font-medium text-white hover:bg-orange-600">
            <Plus size={16} />
            Créer une sortie
          </Link>
        </div>
        
      </aside>

      {/* Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 flex justify-around border-t border-slate-200 bg-white/95 py-2 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] backdrop-blur">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs gap-1 ${isActive ? "text-orange-600" : "text-gray-500"}`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}