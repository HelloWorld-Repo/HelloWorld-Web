import { useTheme, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLocation } from "react-router";
import useDate from "../../hooks/useDate";

const StudentDetails = () => {
  const {
    state: { user },
  } = useLocation();
  const theme = useTheme();
  const { formatToBrDate } = useDate();

  return (
    <Box p={theme.spacing(3, 5)}>
      <Typography marginBottom={theme.spacing(3)}>
        <strong>Turma:</strong> {user?.class?.name || "Usuário sem turma"}
      </Typography>
      <Typography marginBottom={theme.spacing(3)}>
        <strong>Nome:</strong> {user?.name}
      </Typography>
      <Typography marginBottom={theme.spacing(3)}>
        <strong>E-mail:</strong> {user?.email}
      </Typography>
      <Typography marginBottom={theme.spacing(3)}>
        <strong>Data de Aniversário:</strong> {formatToBrDate(user?.birthday)}
      </Typography>
      <Typography marginBottom={theme.spacing(3)}>
        <strong>Criado em:</strong> {formatToBrDate(user?.createdAt)}
      </Typography>
      <Typography>
        <strong>Atualizado em:</strong> {formatToBrDate(user?.updatedAt)}
      </Typography>
    </Box>
  );
};

export default StudentDetails;
