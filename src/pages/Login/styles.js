import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    marginBottom: 16,
    // marginBottom: theme.spacing(2),
  },

  formContainer: {
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: "#00DFC0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  gridContainer: {
    flex: 1,
    minHeight: "100vh",
  },

  loginLabel: {
    // color: "#202020",
    // color: theme.palette.dark.main,
    textAlign: "center",
  },
}));

export default useStyles;
