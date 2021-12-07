import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import { useLocation } from "react-router";

import useDate from "../../hooks/useDate";
import { ChapterDataTable } from "../../components";
import OptionsDataTable from "./components/OptionsDataTable";

const QuestionDetails = () => {
  const { state } = useLocation();
  const { formatToBrDate } = useDate();

  const question = state.question;

  const theme = useTheme();
  return (
    <Box p={theme.spacing(3, 5)}>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        margin={theme.spacing(4, 0)}
      >
        {`Questão`}
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
          <strong>Texto:</strong> {question?.description}
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
      <OptionsDataTable options={question.options} />
    </Box>
  );
};

// QuestionDetails.propTypes = {
//   question: PropTypes.shape({
//     createdAt: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     description: PropTypes.string.isRequired,
//     type: PropTypes.number.isRequired,
//     chapter: PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       module: PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         title: PropTypes.string.isRequired,
//       }).isRequired,
//     }).isRequired,
//     options: PropTypes.arrayOf({
//       text: PropTypes.string.isRequired,
//       id: PropTypes.number.isRequired,
//       isRight: PropTypes.bool.isRequired,
//       createdAt: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// };

export default QuestionDetails;
