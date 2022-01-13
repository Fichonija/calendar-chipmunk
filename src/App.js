import { Outlet } from "react-router-dom";
import Layout from "./components/layout";

const App = () => {
  return (
    <Layout>
      <h1 className="text-center">Welcome to Calendar Chipmunk</h1>
      <Outlet />
    </Layout>
  );
};

export default App;
