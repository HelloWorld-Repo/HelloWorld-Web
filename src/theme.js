import { createTheme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";

const theme = createTheme({
  action: {
    disabledBackground: "grey",
    disabled: "#202020",
  },
  palette: {
    primary: {
      main: "#00DFC0",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00DFC0",
      contrastText: "#202020",
    },
    tertiary: {
      main: "#F6F6F6",
      contrastText: "#00DFC0",
      disabled: "grey",
    },
    error: {
      main: "#ff7575",
    },
    dark: { main: "#202020" },
    background: {
      default: "#FCFCFC",
    },
  },
  typography: {
    fontFamily: "Text Me One",
    fontSize: 18,
    h1: {
      fontFamily: "Londrina Shadow",
      fontSize: 50,
    },
    h2: {
      fontFamily: "Londrina Shadow",
      fontSize: 30,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...darkScrollbar(),
          margin: 0,
        },
      },
    },
  },
});

export default theme;
