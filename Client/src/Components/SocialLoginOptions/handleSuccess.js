import jwt_decode from "jwt-decode";
import { spotyFansApi } from "../../../services/apiConfig";

export const handleSuccessRegister = async (credentialResponse) => {
  try {
    const decoded = jwt_decode(credentialResponse.credential);
    const username = decoded.email.split("@")[0];
    const userData = {
      username,
      email: decoded.email,
      profileImageUrl: decoded.picture,
      isThirdPartyLogin: true,
    };
    const response = await spotyFansApi.post("/user/register", userData);

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error.response.data);
  }
};

export const handleSuccessLogin = async (credentialResponse) => {
  try {
    const decoded = jwt_decode(credentialResponse.credential);
    const username = decoded.email.split("@")[0];
    const userData = {
      username,
      email: decoded.email,
      isThirdPartyLogin: true,
    };
    const response = await spotyFansApi.post("/user/login", userData);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error.response.data);
  }
};
