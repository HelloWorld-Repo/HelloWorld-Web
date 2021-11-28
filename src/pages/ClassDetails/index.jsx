import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import { useLocation } from "react-router";
import PropTypes from "prop-types";

import useDate from "../../hooks/useDate";
import { UserDataTable } from "../../components";

const ClassDetails = () => {
  const { state } = useLocation();
  const { formatToBrDate } = useDate();
  const classItem = state.classItem;

  const theme = useTheme();
  return (
    <Box p={theme.spacing(3, 5)}>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        margin={theme.spacing(4, 0)}
      >
        {`Turma "${classItem.name}"`}
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
          <strong>Nome:</strong> {classItem.name}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Criado em:</strong> {formatToBrDate(classItem.createdAt)}
        </Typography>
        <Typography>
          <strong>Atualizado em:</strong> {formatToBrDate(classItem.updatedAt)}
        </Typography>
      </Box>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h2"
        margin={theme.spacing(4, 0)}
      >
        Alunos
      </Typography>
      <UserDataTable users={classItem.users} />
    </Box>
  );
};

ClassDetails.propTypes = {
  classItem: PropTypes.shape({
    createdAt: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    users: PropTypes.arrayOf({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ClassDetails;