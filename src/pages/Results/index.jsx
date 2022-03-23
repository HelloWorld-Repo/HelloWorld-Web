import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

import { getResultData, getFeedbackData } from "../../services/ResultService";
import { resultOptionBuilder, feedbackOptionBuilder } from "./options";
import useDate from "../../hooks/useDate";

const Results = () => {
  const theme = useTheme();
  const { formatToBrDate } = useDate();

  const [loading, setLoading] = useState(false);
  const [resultOptions, setResultOptions] = useState([]);
  const [feedbackOptions, setFeedbackOptions] = useState([]);
  const [alert, setAlert] = useState({});
  const [resultData, setResultData] = useState();
  const [feedbackData, setFeedbackData] = useState();

  const loadResult = async () => {
    try {
      const response = await getResultData();
      setResultData(response);
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error?.message ||
          "Ocorreu um erro ao recuperar os dados de resultado",
      });
    }
  };

  const loadFeedback = async () => {
    try {
      const response = await getFeedbackData();
      setFeedbackData(response);
    } catch (error) {
      setAlert({
        type: "error",
        message:
          error?.message ||
          "Ocorreu um erro ao recuperar os dados de feedbacks",
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await loadResult();
      await loadFeedback();
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!!resultData) {
      setResultOptions(resultOptionBuilder(resultData));
    }
  }, [resultData]);

  useEffect(() => {
    if (!!feedbackData) {
      setFeedbackOptions(feedbackOptionBuilder(feedbackData));
    }
  }, [feedbackData]);

  return (
    <Box m={theme.spacing(4)}>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        marginBottom={theme.spacing(4)}
      >
        Resultados
      </Typography>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>

      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h2"
        margin={theme.spacing(4, 0)}
      >
        Resumo
      </Typography>

      <ReactEcharts
        option={resultOptions}
        notMerge={true}
        lazyUpdate={true}
        theme={"chalk"}
      />

      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h2"
        margin={theme.spacing(4, 0)}
      >
        Feedbacks
      </Typography>
      <ReactEcharts
        option={feedbackOptions}
        notMerge={true}
        lazyUpdate={true}
        theme={"chalk"}
      />
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h3"
        margin={theme.spacing(4, 0)}
      >
        Comentários
      </Typography>
      <Box maxHeight={450} overflowY="scroll" p={theme.spacing(2)}>
        {feedbackData?.map(
          (feedback, index) =>
            !!feedback?.text &&
            feedback?.text !== " " && (
              <Box
                backgroundColor={theme.palette.grey[200]}
                key={index}
                p={theme.spacing(2, 3)}
                borderRadius={5}
                display="flex"
                alignItems="center"
                mb={theme.spacing(2)}
              >
                {feedback.liked ? (
                  <ThumbUp style={{ color: "#837fff", fontSize: 20 }} />
                ) : (
                  <ThumbDown style={{ color: "#f99393", fontSize: 20 }} />
                )}
                <Box ml={theme.spacing(2)}>
                  <Typography fontSize={17} variant="p">
                    {feedback.text}
                  </Typography>
                  <br />
                  <Typography fontSize={13} variant="p">
                    <strong>Enviado em: </strong>
                    {formatToBrDate(feedback.updatedAt)}
                  </Typography>
                </Box>
              </Box>
            )
        )}
      </Box>
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

export default Results;
