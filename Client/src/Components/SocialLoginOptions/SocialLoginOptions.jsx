import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export default function SocialLoginOptions() {
  const { VITE_GOOGLE_CLIENT_ID } = import.meta.env;

  const handleSuccess = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    console.log(decoded);
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
