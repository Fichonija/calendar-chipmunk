import { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import { CALENDAR_CHIPMUNK_CLIENT_ID, CALENDAR_CHIPMUNK_REDIRECT_URI, CALENDAR_CHIPMUNK_SCOPE } from "./lib/constants";
import Calendar from "./components/calendar";

import "./App.css";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = (loginResponse) => {
    console.log(loginResponse);
    setAccessToken(loginResponse.tokenObj.access_token);
  };
  if (!accessToken) {
    return (
      <div className="container flex-column">
        <div>Hello World! Login to google to continue</div>
        <div className="flex">
          <GoogleLogin
            clientId={CALENDAR_CHIPMUNK_CLIENT_ID}
            uxMode="redirect"
            redirectUri={CALENDAR_CHIPMUNK_REDIRECT_URI}
            scope={CALENDAR_CHIPMUNK_SCOPE}
            buttonText="Login"
            onSuccess={handleLogin}
            onFailure={(response) => console.log(response)}
            isSignedIn="true"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container flex-column">
        <Calendar userName></Calendar>
      </div>
    );
  }
};

export default App;
