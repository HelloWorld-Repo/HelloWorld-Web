import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    backgroundColor: "white",
    padding: 8,
    margin: "8px 0",
    borderRadius: 10
  },
  optionsContainer: {
    padding: "24px 16px",
    backgroundColor: "#ededed",
    borderRadius: 10,
  },
  checkbox: {
    paddingLeft: 20
  }
}));

export default useStyles;
