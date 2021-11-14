import { Routes as Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import { Navbar } from "../components";

const OtherRoutes = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/" element={<Home />} />
    </Switch>
  </>
);

export default OtherRoutes;
