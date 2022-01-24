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
import CreateModuleDialog from "./components/CreateModuleDialog";
import { createModule, getModules } from "../../services/StoryService";
import useTitle from "../../hooks/useTitle";

const Module = () => {
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const [modalOpened, setModalOpened] = useState("");
  const [alert, setAlert] = useState();

  const theme = useTheme();
  useTitle("Módulos");

  const loadModules = async () => {
    try {
      setLoading(true);
      const modules = await getModules();
      setModules(modules);
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro ao recuperar as turmas",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadModules();
    };

    loadData();
  }, []);

  const onSubmitCreateForm = async (values) => {
    try {
      setModalOpened("");
      setLoading(true);
      await createModule(values);
      setAlert({ type: "success", message: "Módulo criado com sucesso" });
      await loadModules();
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro ao criar o módulo",
        type: "error",
      });
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
      <CreateModuleDialog
        open={modalOpened === "create"}
        onClose={() => setModalOpened("")}
        onSubmit={onSubmitCreateForm}
      />
      <Snackbar
        open={!!alert?.message}
        autoHideDuration={6000}
        onClose={() => setAlert(undefined)}
      >
        <Alert
          onClose={() => setAlert(undefined)}
          severity={alert?.type}
          sx={{ width: "100%" }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Module;
