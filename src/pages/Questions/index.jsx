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

import { QuestionsDataTable, QuestionFormDialog } from "../../components";
import { createQuestion, getQuestions } from "../../services/StoryService";

const Questions = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState("");
  const [alert, setAlert] = useState();
  const [questions, setQuestions] = useState([]);

  const theme = useTheme();

  const onSubmitCreateForm = async (values) => {
    try {
      setLoading(true);
      await createQuestion(values);
      await loadQuestions();
      setModalOpened("");
      setAlert({
        message: "Deu tudo certo ao criar a questão",
        type: "success",
      });
    } catch (error) {      
      setAlert({
        message: error || "Ocorreu um erro ao criar questão",
        type: "failure",
      });

    } finally {
      setLoading(false);
    }
  };

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await getQuestions();
      setQuestions(response);
    } catch (error) {
      setAlert({
        message: error || "Ocorreu um erro ao buscar as questões",
        type: "failure",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadQuestions();
    };

    loadData();
  }, []);

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
      <QuestionsDataTable questions={questions} />
      <QuestionFormDialog
        open={modalOpened === "create"}
        onClose={() => setModalOpened("")}
        onSubmit={onSubmitCreateForm}
        title="Criar questão"
        submitText="Criar"
      />
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

export default Questions;
