import { useAuth } from "../../lib/context";
import { ReactComponent as GoogleIcon } from "./google.svg";
import "./login.css";

const Login = (props) => {
  const auth = useAuth();

  return (
    <>
      <button onClick={() => auth.signIn()} className="login-button">
        <GoogleIcon className="login-button-icon" />
        <span className="login-button-text">Sign in</span>
      </button>
      <button onClick={() => auth.signOut()} className="login-button">
        <GoogleIcon className="login-button-icon" />
        <span className="login-button-text">Sign out</span>
      </button>
    </>
  );
};

export default Login;
