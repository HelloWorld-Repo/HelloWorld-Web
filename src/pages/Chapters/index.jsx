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

import { createChapter, getChapters } from "../../services/StoryService";
import { ChapterDataTable, ChapterFormDialog } from "../../components";
import useTitle from "../../hooks/useTitle";

const Module = () => {
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [modalOpened, setModalOpened] = useState("");
  const [alert, setAlert] = useState();

  const theme = useTheme();

  useTitle("Capítulos");

  const loadChapters = async () => {
    try {
      setLoading(true);
      const chapters = await getChapters();
      setChapters(chapters);
    } catch (error) {
      setAlert({
        message: "Ocorreu um erro ao recuperar os capítulos",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadChapters();
    };

    loadData();
  }, []);

  const onSubmitCreateForm = async (values) => {
    try {
      setLoading(true);
      await createChapter(values);
      await loadChapters();
      setModalOpened("");
      setAlert({
        type: "success",
        message: "Deu tudo certo ao criar o capítulo!",
      });
    } catch (error) {
      setAlert({
        message: "Ocorreu um erro ao recuperar os módulos",
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
        Criar Capítulo
      </Button>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        marginBottom={theme.spacing(4)}
      >
        Capítulos
      </Typography>
      <ChapterDataTable chapters={chapters || []} />
      {modalOpened === "create" && (
        <ChapterFormDialog
          open={true}
          onClose={() => setModalOpened("")}
          onSubmit={onSubmitCreateForm}
          title="Criar novo capítulo"
          submitText="Criar capítulo"
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

export default Module;
