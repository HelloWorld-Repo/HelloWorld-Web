import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  markdown: {
    backgroundColor: "#F6F6F6",
    padding: 24,
    "& h1": {
      fontSize: 24,
      fontFamily: "Londrina Shadow",
    },
    "& h2": {
      fontSize: 22,
      fontFamily: "Londrina Shadow",
    },
    "& h3": {
      fontSize: 20,
      fontFamily: "Londrina Shadow",
    },
    "& p": {
      fontSize: 18,
      fontFamily: "Text Me One",
    },
    "& p img": {
      maxWidth: "100%",
    },
  },
}));

export default useStyles;
