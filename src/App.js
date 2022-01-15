import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Layout from "./components/layout";
import { useAuth } from "./lib/context";

const App = () => {
  const auth = useAuth();
  useEffect(() => auth.init(), []);
  return (
    <Layout>
      <h1 className="text-center">Calendar Chipmunk</h1>
      <Outlet />
    </Layout>
  );
};

export default App;
