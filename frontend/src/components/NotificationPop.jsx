import { Bell } from "lucide-react";

import { useState } from "react";



export default function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Notifications"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-orange-100 bg-orange-50 transition hover:bg-orange-100"
      >
        <Bell size={19} className="text-orange-600" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-10 z-20 w-80 rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
          <h2 className="border-b border-slate-100 px-2 pb-2 text-sm font-semibold text-slate-900">Notifications</h2>
          
          
         
        </div>
      )}
    </div>
  );
}
