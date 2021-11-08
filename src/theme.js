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
      main: "#202020",
      contrastText: "#FFFFFF",
    },
    tertiary: {
      main: "#FFFFFF",
      contrastText: "#00DFC0",
      disabled: "grey",
    },
    error: {
      main: "#ff7575",
    },
    white: "#FFF",
    dark: "#202020",
  },
  typography: {
    fonts: {
      title: "Londrina Shadow",
      text: "Text Me One",
    },
    size: {
      title: 50,
      text: 18,
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
