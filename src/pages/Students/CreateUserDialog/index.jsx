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
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useFormik } from "formik";
import * as yup from "yup";
import useDate from "../../../hooks/useDate";

const CreateUserDialog = ({ open = false, onClose, onSubmit }) => {
  const { formatToDefaultDate } = useDate();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      birthday: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Certifique-se que inseriu um formato de e-mail válido")
        .required("Insira o e-mail do novo usuário"),
      name: yup.string().required("Insira o nome do novo usuário"),
      birthday: yup
        .string()
        .nullable(true)
        .required("Insira a data de nascimento do novo usuário"),
    }),
    onSubmit: (values) => {
      if (!!onSubmit)
        onSubmit({
          ...values,
          birthday: formatToDefaultDate(values?.birthday),
        });
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle variant="h1" fontSize={30} textAlign="center">
        Criar novo usuário
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          type="text"
          name="name"
          label="Nome Completo"
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
        />
        <TextField
          fullWidth
          margin="dense"
          type="email"
          name="email"
          label="E-mail"
          error={!!formik.touched.email && !!formik.errors.email}
          helperText={
            !!formik.touched.email && !!formik.errors.email
              ? formik.errors.email
              : ""
          }
          value={formik.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          inputProps={{ style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
        <DesktopDatePicker
          label="Data de Nascimento"
          inputFormat="dd/MM/yyyy"
          value={formik.values.birthday}
          onChange={(value) => formik.setFieldValue("birthday", value, true)}
          renderInput={(params) => (
            <TextField
              fullWidth
              margin="dense"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              {...params}
              name="birthday"
              error={!!formik.touched.birthday && !!formik.errors.birthday}
              helperText={
                !!formik.touched.birthday && !!formik.errors.birthday
                  ? formik.errors.birthday
                  : ""
              }
              onBlur={formik.handleBlur}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="outlined"
          onClick={formik.handleSubmit}
          disabled={!formik.isValid}
        >
          Criar Usuário
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateUserDialog.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
};

export default CreateUserDialog;
