import { useNavigate } from "react-router-dom";
import { useLogin } from "../../lib/hooks";
import AuthService from "../../lib/authService";
import { ReactComponent as GoogleIcon } from "./google.svg";
import "./login.css";

const Login = (props) => {
  const handleLoginSuccess = (loginResponse) => {
    console.log(loginResponse);
    AuthService.saveLoginData({
      user: loginResponse.profileObj,
      token: loginResponse.tokenObj.access_token,
      expiresAt: loginResponse.tokenObj.expires_at,
      expiresIn: loginResponse.tokenObj.expires_in,
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
