import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { CALENDAR_CHIPMUNK_CLIENT_ID, CALENDAR_CHIPMUNK_REDIRECT_URI, CALENDAR_CHIPMUNK_SCOPE } from "../../lib/constants";

const Login = (props) => {
  const [loginData, setLoginData] = useState(null);

  const handleLogin = (loginResponse) => {
    setLoginData({
      name: loginResponse.profileObj.name,
      email: loginResponse.profileObj.email,
      token: loginResponse.tokenObj.access_token,
    });
  };
  return (
    <GoogleLogin
      clientId={CALENDAR_CHIPMUNK_CLIENT_ID}
      uxMode="redirect"
      redirectUri={CALENDAR_CHIPMUNK_REDIRECT_URI}
      scope={CALENDAR_CHIPMUNK_SCOPE}
      buttonText="Sing in with google to continue"
      onSuccess={handleLogin}
      onFailure={(response) => console.log(response)}
      isSignedIn="true"
    />
  );
};

export default Login;
