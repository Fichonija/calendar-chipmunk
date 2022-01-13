import { Link } from "react-router-dom";
import { useAuth } from "../../lib/context";
import "./layout.css";

const Layout = ({ children }) => {
  const auth = useAuth();

  return (
    <>
      <div className="header">
        <h1 className="header-title">Calendar Chipmunk</h1>
        <div className="header-user">
          {auth.userData ? (
            <>
              <p>{auth.userData.user.name}</p>
              <button onClick={auth.signOut}>Logout</button>
            </>
          ) : (
            <Link to="login">Login</Link>
          )}
        </div>
      </div>
      <div className="container">
        <main>{children}</main>
      </div>
      <div className="footer"></div>
    </>
  );
};

export default Layout;
