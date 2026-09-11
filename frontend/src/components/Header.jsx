import { Search, Bell } from "lucide-react";

export default function Header() {
  const initials = "AK";


  return (
    <>
      {/* Desktop */}
      <header className="hidden md:flex items-center justify-between border-b border-slate-300 bg-slate-50 px-6 py-3">
        <div className="flex w-96 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-inset ring-slate-100">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une sortie, un ami..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Notifications" className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-orange-100 bg-orange-50 transition hover:bg-orange-100">
            <Bell size={19} className="text-orange-600" />
            
          </button>
          <div className="w-8 h-8 rounded-lg bg-gray-600 text-white flex items-center justify-center text-sm font-medium">
            {initials}
          </div>
        </div>
      </header>

      {/* Mobile */}
      <header className="flex items-center justify-between border-b border-slate-300 bg-slate-50 px-4 py-3 md:hidden">
        <div>
          <div className="font-bold text-orange-500">meetUp</div>
          <div className="text-[10px] text-gray-400 tracking-wide">TA PROCHAINE SORTIE COMMENCE ICI</div>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-orange-100 bg-orange-50">
            <Bell size={18} className="text-orange-600" />
           
          </button>
          <div className="w-7 h-7 rounded-lg bg-gray-800 text-white flex items-center justify-center text-xs font-medium">
            {initials}
          </div>
        </div>
      </header>
    </>
  );
}