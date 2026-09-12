import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function MesSorties() {
  return (
    <>
      <Header />
      <main className="p-4 pb-20">
        <section className="relative">
          <h1 className="text-xl font-bold">Mes sorties</h1>
          <Link
            to="/nouvelle-sortie"
            aria-label="Créer une nouvelle sortie"
            className="fixed bottom-20 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition hover:bg-orange-600 md:hidden"
          >
            <Plus size={26} strokeWidth={2.5} />
          </Link>
        </section>
      </main>
    </>
  );
}
