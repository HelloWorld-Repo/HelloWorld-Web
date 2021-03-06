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
      contrastText: "#545454",
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
      fontFamily: "Londrina Solid",
      fontSize: 45,
      fontWeight: "700",
    },
    h2: {
      fontFamily: "Londrina Solid",
      fontSize: 30,
      fontWeight: "500",
    },
    h3: {
      fontFamily: "Londrina Solid",
      fontSize: 25,
      fontWeight: "400",
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
