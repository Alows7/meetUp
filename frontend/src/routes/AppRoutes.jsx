import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Accueil from "../pages/Accueil";
import MesSorties from "../pages/MesSorties";
import Discussions from "../pages/Discussions";
import NouvelleSortie from "../pages/NouvelleSortie";
import DetailSortie from "../pages/DetailSortie";

import Notifications from "../pages/Notifications";
import Profil from "../pages/Profil";
import InformationsCompte from "../pages/InformationsCompte";
import LoginPage from "../pages/LoginPage";
import { useAuth } from "../hooks/UseAuth";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); 
  if (loading) return <p>Chargement...</p>; 
  return user ? children : <Navigate to="/connexion" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/mes-sorties" element={<MesSorties />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/nouvelle-sortie" element={<NouvelleSortie />} />
        <Route path="/sorties/:id" element={<DetailSortie />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/informations-compte" element={<InformationsCompte />} />
      </Route>
    </Routes>
  );
}
