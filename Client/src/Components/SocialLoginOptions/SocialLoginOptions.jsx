import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSuccessRegister, handleSuccessLogin } from "./handleSuccess";

export default function SocialLoginOptions() {
  const { VITE_GOOGLE_CLIENT_ID } = import.meta.env;
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    if (location === "/signup") {
      const userRegistered = await handleSuccessRegister(credentialResponse);
      if (userRegistered) navigate("/login");
    } else if (location === "/login") {
      const userLogged = await handleSuccessLogin(credentialResponse);
      if (userLogged) {
        const { token } = userLogged;
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } else {
      console.error(
        "El componente SocialLoginOptions sólo puede ser usado en /login y /register"
      );
    }
  };

  const handleError = () => {
    console.error("Ha ocurrido un error al intentar verificar la cuenta.");
  };

  return (
    <>
      <div>
        <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
          />
        </GoogleOAuthProvider>
      </div>
    </>
  );
}
