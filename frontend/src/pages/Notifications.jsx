
import HeaderBack from "../components/HeaderBack";

export default function Notifications() {
  return (
    <>
      <HeaderBack title="Notifications" />
      <main className="p-4 pb-20">
        <section className="mx-auto max-w-2xl">
          <div className="mb-6">
            <p className="text-sm font-medium text-orange-600">Restez informé</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Notifications</h2>
          </div>

          <div className=" border-slate-200 bg-white shadow-sm">
            <p className="p-5 text-sm text-slate-600">Aucune nouvelle notification.</p>
          </div>
        </section>
      </main>
    </>
  );
}
