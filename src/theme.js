import { createTheme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00DFC0",
    },
    secondary: {
      main: "#202020",
    },
    error: {
      main: "#ff7575",
    },
  },
  typography: {
    fonts: {
      title: "Londrina Shadow",
    },
    size: {
      title: 50,
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
