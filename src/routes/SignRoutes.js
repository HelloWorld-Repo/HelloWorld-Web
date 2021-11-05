import { Routes as Switch, Route } from "react-router-dom";
import App from "../App";

const SignRoutes = () => (
  <Switch>
    <Route exact path="/" element={<App />} />
    <Route path="/signup" element={() => <h1>SignUp</h1>} />
    <Route path="*" element={() => <h1>Page not found</h1>} />
  </Switch>
);

export default SignRoutes;
