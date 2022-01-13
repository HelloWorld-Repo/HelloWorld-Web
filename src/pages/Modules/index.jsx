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

import ModuleDataTable from "./components/ModuleDataTable";
import CreateClassDialog from "./components/CreateClassDialog";
import { getModules } from "../../services/StoryService";
import useTitle from "../../hooks/useTitle";

const Module = () => {
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const [modalOpened, setModalOpened] = useState("");
  const [error, setError] = useState();

  const theme = useTheme();
  useTitle("Módulos");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const modules = await getModules();
        setModules(modules);
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
      setModalOpened("");
      setLoading(true);
      // const newClass = await createClass(values);
      // setModules((oldArray) => [...oldArray, { ...newClass, users: [] }]);
    } catch (error) {
      setError(error?.message || "Ocorreu um erro ao criar o módulo");
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
        Criar Módulo
      </Button>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        marginBottom={theme.spacing(4)}
      >
        Módulos
      </Typography>
      <ModuleDataTable rows={modules || []} />
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

export default Module;
