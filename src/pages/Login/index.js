import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";

import { CALENDAR_CHIPMUNK_CLIENT_ID, CALENDAR_CHIPMUNK_REDIRECT_URI, CALENDAR_CHIPMUNK_SCOPE } from "../../lib/constants";
import { ReactComponent as GoogleIcon } from "./google.svg";
import "./login.css";

const Login = (props) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (loginResponse) => {
    console.log(loginResponse);
    navigate("/calendar", {
      state: {
        name: loginResponse.profileObj.name,
        email: loginResponse.profileObj.email,
        token: loginResponse.tokenObj.access_token,
      },
      replace: false,
    });
  };
  const { signIn } = useGoogleLogin({
    clientId: CALENDAR_CHIPMUNK_CLIENT_ID,
    uxMode: "redirect",
    redirectUri: CALENDAR_CHIPMUNK_REDIRECT_URI,
    scope: CALENDAR_CHIPMUNK_SCOPE,
    onSuccess: handleLoginSuccess,
    onFailure: (response) => console.log(response),
    isSignedIn: true,
  });

  return (
    <button onClick={signIn} className="login-button">
      <GoogleIcon className="login-button-icon" />
      <span className="login-button-text">Sign in with google</span>
    </button>
  );
};

export default Login;
