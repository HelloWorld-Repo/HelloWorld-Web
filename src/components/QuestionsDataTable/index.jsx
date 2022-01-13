import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Alert,
  IconButton,
  Paper,
  Snackbar,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const QuestionsDataTable = ({ questions = [] }) => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Módulo</TableCell>
            <TableCell>Capítulo</TableCell>
            <TableCell>Texto</TableCell>
            <TableCell>Ver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions?.map((question) => (
            <TableRow
              key={question.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{question.id}</TableCell>
              <TableCell>{question.chapter?.module?.title}</TableCell>
              <TableCell>{question.chapter?.title}</TableCell>
              <TableCell>{question.description}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="Visualizar Questão"
                  onClick={() => navigate("/question", { state: { question } })}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </TableContainer>
  );
};

QuestionsDataTable.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      chapter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        module: PropTypes.shape({ title: PropTypes.string.isRequired })
          .isRequired,
      }),
    })
  ),
};

export default QuestionsDataTable;
