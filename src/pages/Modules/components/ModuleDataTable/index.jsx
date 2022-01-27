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
import useDate from "../../../../hooks/useDate";

const ModuleDataTable = ({ rows }) => {
  const navigate = useNavigate();

  const { formatToBrDate } = useDate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="tabela de módulos">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Posição</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Data de Criação</TableCell>
            <TableCell>Visualizar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{formatToBrDate(row.createdAt)}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="Visualizar Módulo"
                  onClick={() =>
                    navigate(`/module/${row.id}`, { state: { module: row } })
                  }
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

ModuleDataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      chapters: PropTypes.array.isRequired,
      id: PropTypes.number.isRequired,
      position: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ModuleDataTable;
