import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Layout>
      <div>Hello mother!</div>
      <Outlet />
    </Layout>
  );
};

export default App;
