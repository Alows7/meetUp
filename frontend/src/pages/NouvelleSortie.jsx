import Header from "../components/Header";
import HeaderBack from "../components/HeaderBack";

export default function NouvelleSortie() {
  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="md:hidden">
        <HeaderBack title="Nouvelle sortie" />
      </div>
      <main className="p-4 pb-20">
      </main>
    </>
  );
}
