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
      
      "& img": {
        maxWidth: "100%",
      },
    },
    "& pre": {
      padding: 25,
      backgroundColor: " rgba(123, 123, 123, 0.1)",
      borderRadius: 20,

      "& code": {
        whiteSpace: "pre-wrap",
      },
    },
  },
}));

export default useStyles;
