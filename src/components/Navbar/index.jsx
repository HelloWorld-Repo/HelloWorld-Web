import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAuth } from "../../contexts/auth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <Box>
      <AppBar position="static" elevation={0} color="tertiary">
        <Toolbar>
          <Typography flexGrow={1} fontSize={20} variant="h6" component="div">
            Olá, {user?.name.split(" ")[0]}
          </Typography>
          <Button fontSize={20} color="inherit">
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
