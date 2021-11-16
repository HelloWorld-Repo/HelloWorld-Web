import React, { useEffect, useState } from "react";
import {
  Typography,
  useTheme,
  Button,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { createClass, getClasses } from "../../services/ClassService";
import ClassDataTable from "./components/ClassDataTable";
import CreateClassDialog from "./components/CreateClassDialog";

const StudantClass = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [modalOpened, setModalOpened] = useState("");
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

  const onSubmitCreateForm = async (values) => {
    try {
      setModalOpened("");
      setLoading(true);
      const newClass = await createClass(values);
      setClasses((oldArray) => [...oldArray, { ...newClass, users: [] }]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m={theme.spacing(4)}>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <Button variant="outlined" onClick={() => setModalOpened("create")}>
        Criar turma
      </Button>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        marginBottom={theme.spacing(4)}
      >
        Turmas
      </Typography>
      <ClassDataTable rows={classes} />
      <CreateClassDialog
        open={modalOpened === "create"}
        onClose={() => setModalOpened("")}
        onSubmit={onSubmitCreateForm}
      />
    </Box>
  );
};

export default StudantClass;
