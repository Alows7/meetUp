import { Routes, Route } from "react-router-dom";
import Accueil from "../pages/Accueil";
import MesSorties from "../pages/MesSorties";
import Discussions from "../pages/Discussions";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/mes-sorties" element={<MesSorties />} />
      <Route path="/discussions" element={<Discussions />} />
    </Routes>
  );
}