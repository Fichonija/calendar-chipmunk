import { Link } from "react-router-dom";
import { useAuth } from "../../lib/context";
import "./layout.css";
import { ReactComponent as ChipmunkIcon } from "./chipmunk.svg";

const Layout = ({ children }) => {
  const auth = useAuth();

  const userInfo = auth.user ? <p>{auth.user.name}</p> : <p>No user logged in</p>;
  return (
    <>
      <div className="header">
        <nav className="header-nav">
          <Link to="login">Login</Link>
          <Link to="calendar">Calendar</Link>
        </nav>
        <div className="header-chipmunk-icon">
          <ChipmunkIcon title="Calendar Chipmnunk icon" />
        </div>
        <div className="header-user">{userInfo}</div>
      </div>
      <div className="container">
        <main>{children}</main>
      </div>
      <div className="footer"></div>
    </>
  );
};

export default Layout;
