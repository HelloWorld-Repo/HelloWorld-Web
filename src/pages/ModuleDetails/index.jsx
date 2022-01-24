import React, { useState, useEffect } from "react";
import {
  Typography,
  useTheme,
  Box,
  Button,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router";
import useDate from "../../hooks/useDate";
import useTitle from "../../hooks/useTitle";
import {
  ChapterDataTable,
  ChapterFormDialog,
  ModuleFormDialog,
} from "../../components";
import {
  createChapter,
  getModule,
  updateModule,
} from "../../services/StoryService";

const ModuleDetails = () => {
  const theme = useTheme();
  const { state } = useLocation();
  const { formatToBrDate } = useDate();

  const moduleId = state.module.id;

  const [module, setModule] = useState();
  const [openedModal, setOpenedModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();

  useTitle(module?.title || "Detalhes do Módulo");

  const loadModule = async () => {
    try {
      setLoading(true);
      const response = await getModule(moduleId);
      setModule(response);
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro ao recuperar o módulo",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadModule();
    };

    loadData();
  }, []);

  const onSubmitCreateChapterForm = async (values) => {
    try {
      setLoading(true);
      await createChapter(values);
      await loadModule();
      setAlert({
        message: "Deu tudo certo com a criação do capítulo!",
        type: "success",
      });
      setOpenedModal("");
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro ao criar o capítulo",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitUpdateModuleForm = async (values) => {
    try {
      setLoading(true);
      await updateModule(values);
      setAlert({
        message: "Deu tudo certo com a criação do capítulo!",
        type: "success",
      });
      await loadModule();
      setOpenedModal("");
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro ao criar o capítulo",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={theme.spacing(3, 5)}>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        margin={theme.spacing(4, 0)}
      >
        {`Módulo "${module?.title}"`}
      </Typography>
      <Box display="flex" justifyContent="end">
        <Button
          variant="outlined"
          size="small"
          onClick={() => setOpenedModal("updateModule")}
        >
          Editar
        </Button>
      </Box>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h2"
        margin={theme.spacing(4, 0)}
      >
        Informações
      </Typography>
      <Box>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Nome:</strong> {module?.title}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Posição:</strong> {module?.position}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Criado em:</strong> {formatToBrDate(module?.createdAt)}
        </Typography>
        <Typography>
          <strong>Atualizado em:</strong> {formatToBrDate(module?.updatedAt)}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography
          color={theme.palette.secondary.contrastText}
          variant="h2"
          margin={theme.spacing(4, 0)}
        >
          Capítulos
        </Typography>
        <Button onClick={() => setOpenedModal("createChapter")}>
          Adicionar Capítulo
        </Button>
      </Box>
      <ChapterDataTable chapters={module?.chapters || []} module={module} />
      <ChapterFormDialog
        open={openedModal === "createChapter"}
        onClose={() => setOpenedModal("")}
        onSubmit={onSubmitCreateChapterForm}
        moduleId={module?.id}
        title="Criar novo capítulo"
        submitText="Criar capítulo"
      />
      {openedModal === "updateModule" && (
        <ModuleFormDialog
          open={true}
          onClose={() => setOpenedModal("")}
          onSubmit={onSubmitUpdateModuleForm}
          module={module}
          title="Editar módulo"
          submitText="Salvar"
        />
      )}
      <Snackbar
        open={!!alert?.message}
        autoHideDuration={6000}
        onClose={() => setAlert({})}
      >
        <Alert
          onClose={() => setAlert({})}
          severity={alert?.type}
          sx={{ width: "100%" }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ModuleDetails;
