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

import { getChapters } from "../../services/StoryService";
import CreateClassDialog from "./components/CreateClassDialog";
import { ChapterDataTable } from "../../components";

const Module = () => {
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [modalOpened, setModalOpened] = useState("");
  const [error, setError] = useState();

  const theme = useTheme();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const chapters = await getChapters();
        setChapters(chapters);
      } catch (error) {
        setError(error || "Ocorreu um erro ao recuperar os capítulos");
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
      // setChapters((oldArray) => [...oldArray, { ...newClass, users: [] }]);
    } catch (error) {
      setError(error || "Ocorreu um erro ao criar o capítulo");
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
