import React, { useEffect, useState } from "react";
import {
  Typography,
  useTheme,
  Box,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { getAllStudants, registerUser } from "../../services/StudantService";
import { UserDataTable } from "../../components";
import useTitle from "../../hooks/useTitle";
import CreateUserDialog from "./CreateUserDialog";

const Students = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [alert, setAlert] = useState();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const [modalOpened, setModalOpened] = useState();

  useTitle("Alunos");

  const loadStudants = async () => {
    try {
      setLoading(true);
      const students = await getAllStudants();
      setUsers(students);
      setFilteredUsers(students);
    } catch (error) {
      setAlert(error?.message || "Ocorreu um erro ao buscar os usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadStudants();
    };

    loadData();
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => setDisplayMessage(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  useEffect(() => {
    setFilteredUsers(
      users?.filter(
        (item) =>
          item.name.toLowerCase().indexOf(displayMessage?.toLowerCase()) >= 0 ||
          item.email.toLowerCase().indexOf(displayMessage?.toLowerCase()) >= 0
      )
    );
  }, [displayMessage, users]);

  const onSubmitForm = async (values) => {
    try {
      setLoading(true);
      await registerUser(values);
      setAlert({
        message: "Administrador criado com sucesso!",
        type: "success",
      });
      setModalOpened("");
      await loadStudants();
    } catch (error) {
      setAlert({
        message: error?.message || "Ocorreu um erro ao criar o usuário",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  return (
    <Box m={theme.spacing(4)}>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <Button variant="outlined" onClick={() => setModalOpened("create")}>
        Criar Administrador
      </Button>
      <Typography
        color={theme.palette.secondary.contrastText}
        variant="h1"
        textAlign="center"
        marginBottom={theme.spacing(4)}
      >
        Alunos
      </Typography>
      <TextField
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        variant="standard"
        placeholder="Procurar usuário"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      ></TextField>
      <Snackbar
        open={!!alert?.message}
        autoHideDuration={6000}
        onClose={() => setAlert(undefined)}
      >
        <Alert
          onClose={() => setAlert(undefined)}
          severity={alert?.type}
          sx={{ width: "100%" }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
      <UserDataTable users={filteredUsers} />
      <CreateUserDialog
        open={modalOpened === "create"}
        onClose={() => setModalOpened("")}
        onSubmit={onSubmitForm}
      />
    </Box>
  );
};

export default Students;
