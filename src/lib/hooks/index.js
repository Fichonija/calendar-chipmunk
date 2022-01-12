import { useGoogleLogin } from "react-google-login";
import { CALENDAR_CHIPMUNK_CLIENT_ID, CALENDAR_CHIPMUNK_REDIRECT_URI, CALENDAR_CHIPMUNK_SCOPE } from "../constants";

const useLogin = (onSuccess, onFailure) => {
  return useGoogleLogin({
    clientId: CALENDAR_CHIPMUNK_CLIENT_ID,
    uxMode: "redirect",
    redirectUri: CALENDAR_CHIPMUNK_REDIRECT_URI,
    scope: CALENDAR_CHIPMUNK_SCOPE,
    onSuccess,
    onFailure,
    isSignedIn: true,
  });
};

export default useLogin;
