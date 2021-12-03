import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const CreateClassDialog = ({ open = false, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Digite o nome da turma"),
    }),
    onSubmit: (values) => {
      if (!!onSubmit) onSubmit(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle variant="h1" fontSize={30} textAlign="center">
        Criar nova turma
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          type="text"
          name="name"
          label="Nome da turma"
          error={!!formik.touched.name && !!formik.errors.name}
          helperText={
            !!formik.touched.name && !!formik.errors.name
              ? formik.errors.name
              : ""
          }
          value={formik.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          inputProps={{ style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
          autoFocus 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="outlined"
          onClick={formik.handleSubmit}
          disabled={!formik.isValid}
        >
          Criar turma
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateClassDialog.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
};

export default CreateClassDialog;
