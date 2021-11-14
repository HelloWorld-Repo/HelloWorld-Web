import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useStyles from "./styles";
import clsx from "clsx";

const Logo = ({ size = 70, spacing = 5, color, containerClasses = {} }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={clsx([classes.logoContainer, containerClasses])}>
      <Typography
        fontSize={size}
        variant="h1"
        lineHeight={1}
        color={color || theme.palette.primary.main}
      >
        {"<Hello"}
      </Typography>
      <Typography
        lineHeight={1}
        marginLeft={spacing}
        variant="h1"
        fontSize={size}
        color={color || theme.palette.primary.main}
      >
        {"World/>"}
      </Typography>
    </div>
  );
};

export default Logo;
