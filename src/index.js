import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import Router from "./route";

const rootElement = document.getElementById("root");

render(
  <AuthProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </AuthProvider>,
  rootElement
);
