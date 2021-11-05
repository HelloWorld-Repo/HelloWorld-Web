import { Routes as Switch, Route } from "react-router-dom";
import App from "../App";

const OtherRoutes = () => (
  <Switch>
    <Route exact path="/" element={<App login />} />
  </Switch>
);

export default OtherRoutes;
