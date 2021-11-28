import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { useAuth } from "../../contexts/auth";
import { Logo } from "../";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const classes = useStyles();

  return (
    <Box>
      <AppBar position="static" elevation={0} color="primary">
        <Toolbar
          classes={{
            root: classes.toolbar,
          }}
        >
          <Typography fontSize={20} component="h6">
            Olá, {user?.name.split(" ")[0]}
          </Typography>
          <Link to="/">
            <Logo
              containerClasses={{ alignSelf: "center" }}
              size={25}
              color="tertiary"
            />
          </Link>
          <Button fontSize={20} color="inherit">
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
