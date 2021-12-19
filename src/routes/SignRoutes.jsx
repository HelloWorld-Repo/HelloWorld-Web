import { Routes as Switch, Route } from "react-router-dom";
import Login from "../pages/Login";

const SignRoutes = () => (
  <Switch>
    <Route path="*" element={<Login />} />
  </Switch>
);

export default SignRoutes;
