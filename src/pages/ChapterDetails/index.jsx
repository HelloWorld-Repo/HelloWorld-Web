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
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import useStyles from "./styles";
import useDate from "../../hooks/useDate";
import { ChapterFormDialog, QuestionsDataTable } from "../../components";
import {
  getChapter,
  getQuestions,
  updateChapter,
} from "../../services/StoryService";

const ChapterDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { state } = useLocation();
  const { formatToBrDate } = useDate();

  const [openedModal, setOpenedModal] = useState("");
  const [chapter, setChapter] = useState(state?.chapter || {});
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const loadChapter = async () => {
    try {
      setLoading(true);
      const response = await getChapter(chapter.id);
      setChapter(response);
      const questionResponse = await getQuestions(chapter.id);
      setQuestions(questionResponse);
    } catch (error) {
      setAlert({
        message: error || "Ocorreu um erro ao recuperar o módulo",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadChapter();
    };

    loadData();
  }, []);

  const onSubmitUpdateChapter = async (values) => {
    try {
      setLoading(true);
      await updateChapter({ id: chapter.id, ...values });
      await loadChapter();
      setOpenedModal("");
      setAlert({ message: "Deu tudo certo com a atualização do capítulo!" });
    } catch (error) {
      setAlert({
        message: error || "Ocorreu um erro ao atualizar o capítulo",
        type: "failure",
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
        {`Questão "${chapter.title}"`}
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
          <strong>Nome:</strong> {chapter.title}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Módulo:</strong> {chapter.module.title}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Criado em:</strong> {formatToBrDate(chapter.createdAt)}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Atualizado em:</strong> {formatToBrDate(chapter.updatedAt)}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Explicação:</strong>
        </Typography>
        <ReactMarkdown className={classes.markdown}>
          {chapter.explanation}
        </ReactMarkdown>
      </Box>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h2"
        margin={theme.spacing(4, 0)}
      >
        Questões
      </Typography>
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
    </Box>
  );
};

ChapterDetails.propTypes = {
  chapter: PropTypes.shape({
    createdAt: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
    users: PropTypes.arrayOf({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ChapterDetails;
