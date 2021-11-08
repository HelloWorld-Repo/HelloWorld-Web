import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    marginBottom: theme.spacing(2),
  },

  formContainer: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  gridContainer: {
    flex: 1,
    minHeight: "100vh",
  },

  loginLabel: {
    color: theme.palette.dark,
    textAlign: "center",
  },
}));

export default useStyles;
