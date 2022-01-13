import { createContext, useContext, useState } from "react";
import AuthService from "../services";

let AuthContext = createContext(null);
const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const signIn = (loginResponse, callback) => {
    AuthService.saveLoginData({
      user: loginResponse.profileObj,
      token: loginResponse.tokenObj.access_token,
      expiresAt: loginResponse.tokenObj.expires_at,
      expiresIn: loginResponse.tokenObj.expires_in,
    });
    setTimeout(loginResponse.tokenObj.expires_in * 1000, signOut);
    setUserData({ user: loginResponse.profileObj, token: loginResponse.tokenObj.access_token });
    callback && callback();
  };

  const signOut = () => {
    AuthService.removeLoginData();
    setUserData(null);
  };

  let value = { userData, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
