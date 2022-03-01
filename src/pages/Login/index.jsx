import React, { useState } from "react";
import { Grid, Button, Typography, useTheme } from "@mui/material";
import AndroidIcon from "@mui/icons-material/Android";

import { Logo } from "../../components";
import useTitle from "../../hooks/useTitle";
import LoginForm from "./components/LoginForm";
import useStyles from "./styles";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  useTitle("Aprenda programação gratuitamente");

  return (
    <Grid
      direction="row"
      container
      backgroundColor={theme.palette.primary.main}
      className={classes.gridContainer}
    >
      <Grid
        direction="column"
        justifyContent="center"
        alignItems="center"
        display="flex"
        md={isAdmin ? 6 : 12}
        xs={12}
        container
        item
        borderRadius={isAdmin ? 0 : 50}
        backgroundColor="#FFF"
      >
        <Logo containerClasses={classes.logoContainer} />
        <Button
          startIcon={<AndroidIcon />}
          variant="outlined"
          download
          href={process.env.REACT_APP_DOWNLOAD_URL}
        >
          Baixar Aplicativo
        </Button>
        <Button onClick={() => setIsAdmin(true)}>Sou Administrador</Button>
      </Grid>
      {isAdmin && (
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
            Você é administrador? Digite seu login para continuar! <br />
            Caso não seja, <strong>baixe o aplicativo</strong>
          </Typography>
          <LoginForm />
        </Grid>
      )}
    </Grid>
  );
};

export default Login;
