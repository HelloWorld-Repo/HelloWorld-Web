import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

const DeleteClassDialog = ({ open = false, onClose, onSubmit, className }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle variant="h1" fontSize={30} textAlign="center">
        Remover turma
      </DialogTitle>
      <DialogContent>
        <Typography>
          Você tem certeza que deseja excluir a turma{" "}
          <strong>{className}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Não, cancelar
        </Button>
        <Button onClick={onSubmit}>Sim, excluir turma</Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteClassDialog.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  className: PropTypes.string.isRequired,
};

export default DeleteClassDialog;
