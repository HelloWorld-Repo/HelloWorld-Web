import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    flexDirection: "column",
    display: "flex",
    width: "100%",
    padding: 24,
    maxWidth: 400,
  },
  buttonContainer: {
    padding: "8, 0",
  },
}));

export default useStyles;
