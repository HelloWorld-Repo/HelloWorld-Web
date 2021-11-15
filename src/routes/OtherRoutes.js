import { Routes as Switch, Route } from "react-router-dom";
import { Navbar } from "../components";

import Home from "../pages/Home";
import Classes from "../pages/StudantClass";

const OtherRoutes = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/class" element={<Classes />} />
      <Route path="/" element={<Home />} />
    </Switch>
  </>
);

export default OtherRoutes;
