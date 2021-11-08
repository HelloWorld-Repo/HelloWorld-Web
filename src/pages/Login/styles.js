import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    marginBottom: theme.spacing(2),
  },

  formContainer: {
    backgroundColor: theme.palette.primary.main,
  },

  gridContainer: {
    flex: 1,
    minHeight: "100vh",
  },
}));

export default useStyles;
