import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";

function GoogleAuthButton() {
  const { googleAuth } = useAuth();
  const navigate = useNavigate();

  async function handleSuccess(credentialResponse) {
    try {
      await googleAuth(credentialResponse.credential);

      console.log("connection réussi");
      navigate("/accueil");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Échec de connexion Google")}
    />
  );
}

export default GoogleAuthButton;
