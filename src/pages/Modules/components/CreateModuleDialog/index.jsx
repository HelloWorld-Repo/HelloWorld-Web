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

const CreateModuleDialog = ({ open = false, onClose, onSubmit, module }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      poosition: ""
    },
    validationSchema: yup.object({
      title: yup.string().required("Digite o título do módulo"),
      position: yup.number().required("Escolha a posição que o módulo terá na jornada")
    }),
    onSubmit: (values) => {
      if (!!onSubmit) onSubmit(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle variant="h1" fontSize={30} textAlign="center">
        Criar novo módulo
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          type="text"
          name="title"
          label="Título do módulo"
          error={!!formik.touched.title && !!formik.errors.title}
          helperText={
            !!formik.touched.title && !!formik.errors.title
              ? formik.errors.title
              : ""
          }
          value={formik.title}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          inputProps={{ style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
        <TextField
          fullWidth
          margin="dense"
          type="number"
          name="position"
          label="Posição do módulo"
          error={!!formik.touched.position && !!formik.errors.position}
          helperText={
            !!formik.touched.position && !!formik.errors.position
              ? formik.errors.position
              : ""
          }
          value={formik.position}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          inputProps={{ style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="outlined"
          onClick={formik.handleSubmit}
          disabled={!formik.isValid}
        >
          Criar módulo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateModuleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  module: PropTypes.shape({
    position: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    chapters: PropTypes.array.isRequired,
  }),
};

export default CreateModuleDialog;
