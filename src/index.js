import { ThemeProvider } from "@mui/material/styles";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { AuthProvider } from "./contexts/auth";
import Router from "./route";
import theme from "./theme";

import "@fontsource/londrina-outline/400.css";
import "@fontsource/londrina-shadow/400.css";
import "@fontsource/londrina-sketch/400.css";
import "@fontsource/londrina-solid/100.css";
import "@fontsource/londrina-solid/300.css";
import "@fontsource/londrina-solid/400.css";
import "@fontsource/londrina-solid/900.css";
import "@fontsource/text-me-one/400.css";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>,
  rootElement
);
