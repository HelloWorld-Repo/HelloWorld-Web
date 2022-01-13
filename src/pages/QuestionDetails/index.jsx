import React, { useState, useEffect } from "react";
import {
  Typography,
  useTheme,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useLocation } from "react-router";

import OptionsDataTable from "./components/OptionsDataTable";
import useDate from "../../hooks/useDate";
import useTitle from "../../hooks/useTitle";
import { QuestionFormDialog } from "../../components";
import { getQuestion, updateQuestion } from "../../services/StoryService";

const QuestionDetails = () => {
  const theme = useTheme();
  const { formatToBrDate } = useDate();

  const { state } = useLocation();
  const questionId = state.question.id;

  const [question, setQuestion] = useState({});
  const [openedModal, setOpenedModal] = useState("");
  const [loading, setLoading] = useState("");
  const [alert, setAlert] = useState();

  useTitle("Detalhes da Questão");

  const loadQuestion = async () => {
    try {
      setLoading(true);
      const response = await getQuestion(questionId);
      setQuestion(response);
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro ao recuperar a questão",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadQuestion();
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitUpdateQuestion = async (values) => {
    try {
      setLoading(true);
      await updateQuestion({ ...values, id: question?.id });
      await loadQuestion();
      setOpenedModal("");
      setAlert({
        message: "Deu tudo certo com a atualização da questão!",
        type: "success",
      });
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro ao atualizar a questão",
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
        {`Questão`}
      </Typography>
      <Box display="flex" justifyContent="end">
        <Button
          variant="outlined"
          size="small"
          onClick={() => setOpenedModal("updateQuestion")}
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
          <strong>Texto:</strong> {question?.description}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Tipo:</strong>{" "}
          {question?.type === "1" ? "Múltipla Escolha" : "Lacunas"}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Módulo:</strong> {question?.chapter?.module?.title}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Capítulo:</strong> {question?.chapter?.title}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Criado em:</strong> {formatToBrDate(question?.createdAt)}
        </Typography>
      </Box>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h2"
        margin={theme.spacing(4, 0)}
      >
        Opções de resposta
      </Typography>
      <OptionsDataTable options={question?.options} />
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

      {openedModal === "updateQuestion" && (
        <QuestionFormDialog
          title="Atualizar Questão"
          submitText="Salvar"
          onClose={() => setOpenedModal("")}
          onSubmit={onSubmitUpdateQuestion}
          question={question}
          open={true}
        />
      )}
    </Box>
  );
};

export default QuestionDetails;
