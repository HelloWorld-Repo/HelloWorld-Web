import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import { useLocation } from "react-router";
import PropTypes from "prop-types";

import useDate from "../../hooks/useDate";
import { ChapterDataTable } from "../../components";

const ModuleDetails = () => {
  const { state } = useLocation();
  const { formatToBrDate } = useDate();

  const module = state.module;

  const theme = useTheme();
  return (
    <Box p={theme.spacing(3, 5)}>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        margin={theme.spacing(4, 0)}
      >
        {`Módulo "${module.title}"`}
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
          <strong>Nome:</strong> {module.title}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Posição:</strong> {module.position}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Criado em:</strong> {formatToBrDate(module.createdAt)}
        </Typography>
        <Typography>
          <strong>Atualizado em:</strong> {formatToBrDate(module.updatedAt)}
        </Typography>
      </Box>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h2"
        margin={theme.spacing(4, 0)}
      >
        Capítulos
      </Typography>
      <ChapterDataTable chapters={module.chapters} module={module} />
    </Box>
  );
};

ModuleDetails.propTypes = {
  module: PropTypes.shape({
    createdAt: PropTypes.string,
    id: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    chapters: PropTypes.arrayOf({
      title: PropTypes.string.isRequired,
      position: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ModuleDetails;
