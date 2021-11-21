import { Routes as Switch, Route } from "react-router-dom";
import { Navbar } from "../components";

import Home from "../pages/Home";
import Classes from "../pages/StudantClass";
import ClassDetails from "../pages/ClassDetails";

const OtherRoutes = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/class/detail" element={<ClassDetails />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/" element={<Home />} />
    </Switch>
  </>
);

export default OtherRoutes;
