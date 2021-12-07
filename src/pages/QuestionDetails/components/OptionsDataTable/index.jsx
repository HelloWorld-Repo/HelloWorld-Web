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
import useDate from "../../../../hooks/useDate";

const OptionsDataTable = ({ options }) => {
  const { formatToBrDate } = useDate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tabela de opções de resposta">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Texto</TableCell>
            <TableCell>Opção Correta</TableCell>
            <TableCell>Data de Criação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map((option) => (
            <TableRow
              key={option.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{option.id}</TableCell>
              <TableCell>{option.text}</TableCell>
              <TableCell>{option.isRight ? "Sim" : "Não"}</TableCell>
              <TableCell>{formatToBrDate(option.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

OptionsDataTable.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      isRight: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default OptionsDataTable;
