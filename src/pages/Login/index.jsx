import React from "react";
import { Grid, Button, Typography, useTheme } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { Logo } from "../../components";
import LoginForm from "./components/LoginForm";
import useStyles from "./styles";

const Login = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid direction="row" container className={classes.gridContainer}>
      <Grid
        direction="column"
        justifyContent="center"
        alignItems="center"
        display="flex"
        md={6}
        xs={12}
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
        md={6}
        xs={12}
        direction="column"
        container
        item
        padding={theme.spacing(0, 2)}
      >
        <Typography textAlign="center">
          Olá novamente, digite seu login para continuar
        </Typography>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default Login;
