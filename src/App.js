import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "./components/layout";
import { useAuth } from "./lib/context";

const App = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => auth.init(() => navigate("/calendar")), []);
  return (
    <Layout>
      <h1 className="text-center">Calendar Chipmunk</h1>
      <Outlet />
    </Layout>
  );
};

export default App;
