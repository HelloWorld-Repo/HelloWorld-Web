import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  IconButton,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const UserDataTable = ({ users, sampleMode = false }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Ver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="Visualizar Aluno"
                  onClick={() => navigate("/user", { state: { user } })}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

UserDataTable.propTypes = {
  users: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  sampleMode: PropTypes.bool,
};

export default UserDataTable;
