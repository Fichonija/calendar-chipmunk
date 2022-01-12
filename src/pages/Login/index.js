import { useNavigate } from "react-router-dom";
import { useLogin } from "../../lib/hooks";
import AuthService from "../../lib/authService";
import { ReactComponent as GoogleIcon } from "./google.svg";
import "./login.css";

const Login = (props) => {
  const handleLoginSuccess = ({ profileObj: user, tokenObj: { access_token: token, expires_at: expiresAt, expires_in: expiresIn } }) => {
    AuthService.saveLoginData({
      user,
      token,
      expiresAt,
      expiresIn,
    });
    navigate("/calendar");
  };
  const handleLoginFailure = (loginResponse) => console.log(loginResponse);

  const navigate = useNavigate();
  const { signIn } = useLogin(handleLoginSuccess, handleLoginFailure);

  return (
    <button onClick={signIn} className="login-button">
      <GoogleIcon className="login-button-icon" />
      <span className="login-button-text">Sign in with google</span>
    </button>
  );
};

export default Login;
