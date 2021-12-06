import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { Logo } from "../../components";
import LoginForm from "./components/LoginForm";
import useStyles from "./styles";

const Login = () => {
  const classes = useStyles();

  return (
    <Grid direction="row" container className={classes.gridContainer}>
      <Grid
        direction="column"
        justifyContent="center"
        alignItems="center"
        display="flex"
        xs={6}
        container
        item
      >
        <Logo containerClasses={classes.logoContainer} />
        <Button startIcon={<FileDownloadOutlinedIcon />} variant="outlined">
          Baixar Aplicativo
        </Button>
      </Grid>
      <Grid
        className={classes.formContainer}
        xs={6}
        direction="column"
        container
        item
      >
        <Typography>
          Olá novamente, digite seu login para continuar
        </Typography>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default Login;
