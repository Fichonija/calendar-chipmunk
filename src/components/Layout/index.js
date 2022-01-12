import { Link } from "react-router-dom";
import { useAuth } from "../../lib/hooks";
import "./layout.css";

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      <div className="header">
        <h1 className="header-title">Calendar Chipmunk</h1>
        {/* {user ? <p className="header-user">{user.name}</p> : <p className="header-user">No user logged in</p>} */}
        <div className="header-user">
          <Link to="login">Login</Link>
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
