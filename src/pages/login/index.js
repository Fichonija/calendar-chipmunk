import { useAuth } from "../../lib/context";
import { ReactComponent as GoogleIcon } from "./google.svg";
import "./login.css";

const Login = () => {
  const auth = useAuth();

  return (
    <>
      {auth.user ? (
        <button onClick={() => auth.signOut()} className="login-button">
          <GoogleIcon title="Google icon" className="login-button-icon" />
          <span className="login-button-text">Sign out</span>
        </button>
      ) : (
        <button onClick={() => auth.signIn()} className="login-button">
          <GoogleIcon title="Google icon" className="login-button-icon" />
          <span className="login-button-text">Sign in</span>
        </button>
      )}
    </>
  );
};

export default Login;
