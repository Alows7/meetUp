import { useState } from "react";
import AuthTabs from "../components/AuthTabs";
import FormInput from "../components/FormInput";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleButton";

const LoginPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register({ email, password, pseudo });
      }
      console.log("connected");
      navigate("/accueil");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <section
        className="relative flex flex-col justify-between pt-6 pb-10
      lg:p-14 bg-linear-to-br from-[#0A1210] via-[#1E3530] to-[#2E6E5C]
       text-white overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_15%,rgba(180,90,50,0.35),transparent_60%)]" />
        <div className="relative z-10 text-3xl font-black tracking-tight">
          meet<span className="text-[#F0693F]">Up</span>
        </div>
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl lg:text-5xl font-black leading-[1.05] mb-6">
            Ta prochaine sortie commence ici.
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Retrouve tes amis pour les grands rassemblements publics, organise
            tes sorties privées, et garde le contact avec tout le monde au même
            endroit.
          </p>
        </div>
        <div className="relative z-10 mt-8 space-y-3">
          <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-lg">
              🎂
            </div>
            <div>
              <p className="text-sm font-semibold">Anniversaire de Sena</p>
              <p className="text-xs text-white/50">9 participants confirmés</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-lg">
              🌅
            </div>
            <div>
              <p className="text-sm font-semibold">
                Plage sunset & feu de camp
              </p>
              <p className="text-xs text-white/50">128 inscrits · public</p>
            </div>
          </div>
        </div>
        <p className="relative z-10 text-white/40 text-xs">
          © 2026 meetUp — Planifie, invite, profite.
        </p>
      </section>

      <section className="pt-6 pb-10 relative flex flex-col justify-center items-center">
        <div className="w-full max-w-sm">
          <AuthTabs active={mode} onChange={setMode} />

          <h2 className="font-display text-xl text-ink mt-6">
            {mode === "register"
              ? "Rejoindre meetUp"
              : "Content de vous revoir"}
          </h2>
          <p className="text-sm text-ink-soft mb-4">
            {mode === "register"
              ? " Crée ton compte pour commencer à planifier"
              : "Connecte-toi pour retrouver tes sorties"}
          </p>

          <form onSubmit={handleSubmit}>
            {mode === "register" && (
              <FormInput
                label="PSEUDO"
                type="text"
                name="pseudo"
                value={pseudo}
                setValue={setPseudo}
              />
            )}

            <FormInput
              label="EMAIL"
              type="email"
              name="email"
              value={email}
              setValue={setEmail}
            />
            <PasswordField
              label="MOT DE PASSE"
              name="password"
              value={password}
              setValue={setPassword}
              placeholder="••••••••"
            />

            {mode === "register" && (
              <>
                <div className="flex gap-1.5 mt-2 mb-1">
                  <div className="flex-1 h-1 rounded-full bg-gray-200"></div>
                  <div className="flex-1 h-1 rounded-full bg-gray-200"></div>
                  <div className="flex-1 h-1 rounded-full bg-gray-200"></div>
                </div>
                <p className="text-xs text-ink-soft mb-4">
                  Force du mot de passe
                </p>
              </>
            )}
            {error && <p className="text-coral-deep text-xs mt-2">{error}</p>}
            <button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer py-3 rounded-xl bg-coral text-white font-bold text-sm"
            >
              {mode === "register" ? " Créer mon compte" : "Se connecter"}
            </button>
          </form>

          <GoogleAuthButton />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
