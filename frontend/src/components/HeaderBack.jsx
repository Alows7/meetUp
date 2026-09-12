import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeaderBack({ title }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 mt-2 flex items-center gap-3 bg-slate-50 px-4 py-3">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Retour"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white pt-1 text-slate-600 shadow-sm transition hover:bg-slate-100"
      >
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
    </header>
  );
}
