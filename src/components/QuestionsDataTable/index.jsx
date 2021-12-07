import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Alert,
  Backdrop,
  CircularProgress,
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

import { getQuestions } from "../../services/StoryService";
import useDate from "../../hooks/useDate";

const QuestionsDataTable = ({ chapterId }) => {
  const navigate = useNavigate();
  const { formatToBrDate } = useDate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await getQuestions(chapterId ?? undefined);
        setQuestions(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [chapterId]);

  return (
    <TableContainer component={Paper}>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
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
  chapterId: PropTypes.number.isRequired,
};

export default QuestionsDataTable;
