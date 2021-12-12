import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import { useLocation } from "react-router";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import useStyles from "./styles";
import useDate from "../../hooks/useDate";
import { QuestionsDataTable } from "../../components";

const ChapterDetails = () => {
  const { state } = useLocation();
  const { formatToBrDate } = useDate();
  const chapter = state.chapter;
  const classes = useStyles();
  const theme = useTheme();
  
  return (
    <Box p={theme.spacing(3, 5)}>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        margin={theme.spacing(4, 0)}
      >
        {`Questão "${chapter.title}"`}
      </Typography>
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
      <QuestionsDataTable chapterId={chapter.id} />
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
