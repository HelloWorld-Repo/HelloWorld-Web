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

import CreateClassDialog from "./components/CreateClassDialog";
import { QuestionsDataTable } from "../../components";

const Questions = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState("");
  const [error, setError] = useState();

  const theme = useTheme();

  const onSubmitCreateForm = async (values) => {
    try {
      setModalOpened("");
      setLoading(true);
      // const newClass = await createClass(values);
      // setQuestions((oldArray) => [...oldArray, { ...newClass, users: [] }]);
    } catch (error) {
      setError(error || "Ocorreu um erro ao criar questão");
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
        Criar Questão
      </Button>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        marginBottom={theme.spacing(4)}
      >
        Questões
      </Typography>
      <QuestionsDataTable />
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

export default Questions;
