import React, { useRef, useState } from "react";
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

import useDate from "../../hooks/useDate";
import { UserDataTable } from "../../components";
import useTitle from "../../hooks/useTitle";
import { importUsers } from "../../services/UserService";

const ClassDetails = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [fileArea, setFileArea] = useState(false);
  const uploadInputRef = useRef(null);

  const { state } = useLocation();
  const { formatToBrDate } = useDate();
  const classItem = state.classItem;

  useTitle(classItem?.name || "Detalhes da Turma");

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("classId", classItem?.id);

      const response = await importUsers(formData);
      console.log(response);
      if (response?.errors?.length === 0) {
        return setAlert({
          message: "Usuários importados com sucesso!",
          type: "success",
          duration: 6000,
        });
      }

      setAlert({
        message: `Erro ao criar os usuários: ${response?.errors
          .map((error) => error.user)
          .join(", ")}`,
        type: "info",
      });
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro na importação do arquivo",
        type: "error",
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
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
        {`Turma "${classItem?.name}"`}
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
          <strong>Nome:</strong> {classItem?.name}
        </Typography>
        <Typography marginBottom={theme.spacing(3)}>
          <strong>Criado em:</strong> {formatToBrDate(classItem?.createdAt)}
        </Typography>
        <Typography>
          <strong>Atualizado em:</strong> {formatToBrDate(classItem?.updatedAt)}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography
          color={theme.palette.secondary.contrastText}
          variant="h2"
          margin={theme.spacing(4, 0)}
        >
          Alunos
        </Typography>
        <Button onClick={() => setFileArea(true)}>Importar alunos</Button>
      </Box>
      {fileArea && (
        <Box
          backgroundColor={theme.palette.grey[100]}
          padding={theme.spacing(3)}
          border="dotted"
          borderColor={theme.palette.grey[200]}
          borderRadius={5}
          marginBottom={theme.spacing(4)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          transition="opacity 500ms ease-in"
        >
          <Typography fontSize={17} marginBottom={theme.spacing(1)}>
            {!!file
              ? `Arquivo selecionado: ${file?.name}`
              : "Nenhum arquivo selecionado"}
          </Typography>

          <Button
            onClick={() =>
              uploadInputRef?.current && uploadInputRef?.current?.click()
            }
          >
            Selecionar arquivo
            <input
              ref={uploadInputRef}
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              hidden
              onChange={onFileChange}
            />
          </Button>
          <Button
            onClick={onFileUpload}
            variant="outlined"
            size="small"
            disabled={!file}
          >
            Enviar
          </Button>
        </Box>
      )}
      <Snackbar open={!!alert?.message} onClose={() => setAlert({})}>
        <Alert
          onClose={() => setAlert({})}
          severity={alert?.type}
          sx={{ width: "100%" }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
      <UserDataTable users={classItem?.users} />
    </Box>
  );
};

export default ClassDetails;
