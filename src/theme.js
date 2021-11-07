import { createTheme } from "@mui/material/styles";

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
});

export default theme;
