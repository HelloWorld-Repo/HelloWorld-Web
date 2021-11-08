import React from "react";
import { Grid, Button } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import useStyles from "./styles";
import { Logo } from "../../components";

const Login = (props) => {
  const classes = useStyles();

  return (
    <Grid direction="row" container className={classes.gridContainer}>
      <Grid
        direction="column"
        justifyContent="center"
        alignItems="center"
        display="flex"
        xs={6}
      >
        <Logo containerClasses={classes.logoContainer} />
        <Button
          startIcon={<FileDownloadOutlinedIcon />}
          variant="outlined"
        >
          Baixar Aplicativo
        </Button>
      </Grid>
      <Grid className={classes.formContainer} xs={6}>
        Teste 2
      </Grid>
    </Grid>
  );
};

Login.propTypes = {};

export default Login;
