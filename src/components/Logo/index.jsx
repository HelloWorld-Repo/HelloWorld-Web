import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import useStyles from "./styles";

const Logo = ({ size = 40, spacing = 5, color }) => {
  const theme = useTheme();
  const classes = useStyles();

  console.log(theme)

  return (
    <div className={classes.logoContainer}>
      <Typography
        key="h1"
        fontSize={size}
        fontFamily={theme.typography.fonts.title}
        lineHeight={1}
        color={color || theme.palette.primary.main}
      >
        {"<Hello"}
      </Typography>
      <Typography
        lineHeight={1}
        marginLeft={spacing}
        key="h1"
        fontFamily={theme.typography.fonts.title}
        fontSize={size}
        color={color || theme.palette.primary.main}
      >
        {"World/>"}
      </Typography>
    </div>
  );
};

export default Logo;
