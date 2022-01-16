import { createContext, useContext, useState } from "react";
import { AuthService } from "../services";

let AuthContext = createContext(null);
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //  called from App.js, handles sign in with redirect
  //  if user signed in, sets user data in context
  const init = (callback) => {
    AuthService.init((isInitialized) => {
      if (AuthService.isSignedIn()) {
        AuthService.initTokenRefresh();
        setUser(AuthService.getUser());
        callback && callback();
      }
    });
  };

  const signOut = () => {
    AuthService.signOut().then((res) => {
      setUser(null);
    });
  };

  const signIn = () => {
    AuthService.signInRedirect();
  };

  let value = { user, signIn, signOut, init };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
