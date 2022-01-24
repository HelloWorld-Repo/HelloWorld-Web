import React, { useEffect, useState } from "react";
import {
  Typography,
  useTheme,
  Button,
  Box,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import { createClass, getClasses } from "../../services/ClassService";
import useTitle from "../../hooks/useTitle";
import ClassDataTable from "./components/ClassDataTable";
import CreateClassDialog from "./components/CreateClassDialog";

const StudantClass = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [modalOpened, setModalOpened] = useState("");
  const [error, setError] = useState();

  const theme = useTheme();
  useTitle("Turmas");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const classes = await getClasses();
        setClasses(classes);
      } catch (error) {
        setError(error?.message || "Ocorreu um erro ao recuperar as turmas");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const onSubmitCreateForm = async (values) => {
    try {
      setLoading(true);
      const newClass = await createClass(values);
      setClasses((oldArray) => [...oldArray, { ...newClass, users: [] }]);
      setModalOpened("");
    } catch (error) {
      setError(error?.message || "Ocorreu um erro ao criar a turma");
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
      <ClassDataTable rows={classes || []} />
      <CreateClassDialog
        open={modalOpened === "create"}
        onClose={() => setModalOpened("")}
        onSubmit={onSubmitCreateForm}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(undefined)}
      >
        <Alert
          onClose={() => setError(undefined)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudantClass;
