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

const ModuleFormDialog = ({
  open = false,
  onClose,
  onSubmit,
  module,
  title,
  submitText,
}) => {
  const formik = useFormik({
    initialValues: {
      title: module?.title || "",
      position: module?.position || "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Digite o título do módulo"),
      position: yup
        .number()
        .required("Escolha a posição que o módulo terá na jornada"),
    }),
    onSubmit: (values) => {
      if (!!onSubmit) {
        if (!!module) return onSubmit({ ...values, id: module?.id });
        onSubmit(values);
      }
    },
    enableReinitialize: true,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle variant="h1" fontSize={30} textAlign="center">
        {title}
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
          value={formik.values.title}
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
          value={formik.values.position}
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
          {submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModuleFormDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  module: PropTypes.shape({
    position: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  title: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default ModuleFormDialog;
