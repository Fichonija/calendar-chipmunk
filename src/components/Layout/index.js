import "./layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <div className="header">
        <h1 className="header-title">Calendar Chipmunk</h1>
      </div>
      <div className="container">
        <main>{children}</main>
      </div>
      <div className="footer"></div>
    </>
  );
};

export default Layout;
