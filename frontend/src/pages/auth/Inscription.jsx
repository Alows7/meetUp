import { Link, useNavigate } from "react-router-dom";

export default function Inscription() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    sessionStorage.setItem("meetup-auth", "true");
    navigate("/");
  }

  return (
    <section className="mx-auto max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Créer un compte</h1>
         </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        
           
       
        <button type="submit" className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600">S&apos;inscrire</button>
        <p className="mt-5 text-center text-sm text-slate-500">
          Déjà un compte ? <Link to="/connexion" className="font-medium text-orange-600 hover:text-orange-700">Se connecter</Link>
        </p>
      </form>
    </section>
  );
}