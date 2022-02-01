import React, { useState, useEffect, useCallback } from "react";
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
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";

import useStyles from "./styles";
import useDate from "../../hooks/useDate";
import {
  ChapterFormDialog,
  QuestionFormDialog,
  QuestionsDataTable,
} from "../../components";
import {
  createQuestion,
  getChapter,
  getQuestions,
  updateChapter,
} from "../../services/StoryService";
import useTitle from "../../hooks/useTitle";

const ChapterDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { formatToBrDate } = useDate();

  const { id: chapterId } = useParams();

  const [openedModal, setOpenedModal] = useState("");
  const [chapter, setChapter] = useState({});
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [alert, setAlert] = useState({});

  useTitle(chapter?.name || "Detalhes do capítulo");

  const loadChapter = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getChapter(chapterId);
      setChapter(response);
      const questionResponse = await getQuestions(chapterId);
      setQuestions(questionResponse);
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro ao recuperar o módulo",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  useEffect(() => {
    const loadData = async () => {
      await loadChapter();
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitUpdateChapter = async (values) => {
    try {
      setLoading(true);
      await updateChapter({ id: chapterId, ...values });
      await loadChapter();
      setOpenedModal("");
      setAlert({
        message: "Deu tudo certo com a atualização do capítulo!",
        type: "success",
      });
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro ao atualizar o capítulo",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitCreateQuestion = async (question) => {
    try {
      setLoading(true);
      await createQuestion(question);
      await loadChapter();
      setOpenedModal("");
      setAlert({
        type: "success",
        message: "Deu tudo certo ao criar a nova questão!",
      });
    } catch (error) {
      setAlert({
        message: "Ocorreu um erro ao criar a questão",
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
        {`Capítulo "${chapter?.title}"`}
      </Typography>
      <Box display="flex" justifyContent="end">
        <Button
          variant="outlined"
          size="small"
          onClick={() => setOpenedModal("updateChapter")}
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
          <strong>Nome:</strong> {chapter?.title}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Módulo:</strong> {chapter?.module?.title}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Criado em:</strong> {formatToBrDate(chapter?.createdAt)}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Atualizado em:</strong> {formatToBrDate(chapter?.updatedAt)}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Explicação:</strong>
        </Typography>
        <ReactMarkdown className={classes.markdown}>
          {chapter?.explanation}
        </ReactMarkdown>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography
          color={theme.palette.secondary.contrastText}
          variant="h2"
          margin={theme.spacing(4, 0)}
        >
          Questões
        </Typography>
        <Button onClick={() => setOpenedModal("createQuestion")}>
          Adicionar Questão
        </Button>
      </Box>
      <QuestionsDataTable questions={questions} />
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

      {openedModal === "updateChapter" && (
        <ChapterFormDialog
          open={true}
          onClose={() => setOpenedModal("")}
          onSubmit={onSubmitUpdateChapter}
          chapter={chapter}
          title="Atualizar capítulo"
          submitText="Salvar"
        />
      )}
      {openedModal === "createQuestion" && (
        <QuestionFormDialog
          open={true}
          onClose={() => setOpenedModal("")}
          onSubmit={onSubmitCreateQuestion}
          title="Adicionar Questão"
          submitText="Criar"
          chapterId={chapterId}
        />
      )}
    </Box>
  );
};

export default ChapterDetails;
