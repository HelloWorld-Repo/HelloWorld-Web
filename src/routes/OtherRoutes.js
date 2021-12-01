import { Routes as Switch, Route } from "react-router-dom";
import { Navbar } from "../components";

import Home from "../pages/Home";
import Classes from "../pages/StudentClass";
import Students from "../pages/Students";
import Modules from "../pages/Modules";
import ClassDetails from "../pages/ClassDetails";
import StudentDetails from "../pages/StudentDetails";

const OtherRoutes = () => (
  <>
    <Navbar />
    <Switch>
      <Route path="/users" element={<Students />} />
      <Route path="/user" element={<StudentDetails />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/class" element={<ClassDetails />} />
      <Route path="/module" element={<ClassDetails />} />
      <Route path="/modules" element={<Modules />} />
      <Route path="/" element={<Home />} />
    </Switch>
  </>
);

export default OtherRoutes;
