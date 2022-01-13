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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { UserDataTable } from "../../components";
import useTitle from "../../hooks/useTitle";
import { getAllStudants } from "../../services/StudantService";

const Students = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");

  useTitle("Alunos");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const students = await getAllStudants();
        setUsers(students);
        setFilteredUsers(students);
      } catch (error) {
        setError(error?.message || "Ocorreu um erro ao buscar os usuários");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => setDisplayMessage(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (item) =>
          item.name.toLowerCase().indexOf(displayMessage.toLowerCase()) >= 0 ||
          item.email.toLowerCase().indexOf(displayMessage.toLowerCase()) >= 0
      )
    );
  }, [displayMessage, users]);

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
        marginBottom={theme.spacing(4)}
        fullWidth
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
      <UserDataTable users={filteredUsers} />
    </Box>
  );
};

export default Students;
