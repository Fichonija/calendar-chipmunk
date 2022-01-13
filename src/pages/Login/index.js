import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/context";
import { useLogin } from "../../lib/hooks";
import { ReactComponent as GoogleIcon } from "./google.svg";
import "./login.css";

const Login = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { signIn } = useLogin(
    (loginResponse) => auth.signIn(loginResponse, () => navigate("/calendar")),
    (loginResponse) => console.log(loginResponse)
  );

  return (
    <button onClick={signIn} className="login-button">
      <GoogleIcon className="login-button-icon" />
      <span className="login-button-text">Sign in with google</span>
    </button>
  );
};

export default Login;
