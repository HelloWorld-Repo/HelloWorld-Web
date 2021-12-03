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
import useDate from "../../hooks/useDate";

const ChapterDataTable = ({ chapters }) => {
  const navigate = useNavigate();
  const { formatToBrDate } = useDate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Posição</TableCell>
            <TableCell>Data de Criação</TableCell>
            <TableCell>Ver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chapters.map((chapter) => (
            <TableRow
              key={chapter.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{chapter.title}</TableCell>
              <TableCell>{chapter.position}</TableCell>
              <TableCell>{formatToBrDate(chapter?.createdAt)}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="Visualizar Capítulo"
                  onClick={() => navigate("/chapter", { state: { chapter } })}
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

ChapterDataTable.propTypes = {
  chapters: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChapterDataTable;
