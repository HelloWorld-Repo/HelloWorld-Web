import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    flexDirection: "column",
    display: "flex",
    width: "100%",
    padding: theme.spacing(3),
    maxWidth: 400,
  },
  input: {
    margin: theme.spacing(2),
  },
  buttonContainer: {
    padding: theme.spacing(1, 0),
  },
}));

export default useStyles;
