import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

import { getClasses } from "../../services/ClassService";
import { Typography, useTheme } from "@mui/material";
import ClassDataTable from "./components/ClassDataTable";

const StudantClass = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState();

  const theme = useTheme();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const classes = await getClasses();
        setClasses(classes);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Box m={theme.spacing(4)}>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        marginBottom={theme.spacing(4)}
      >
        Turmas
      </Typography>
      <ClassDataTable rows={classes} />
    </Box>
  );
};

export default StudantClass;
