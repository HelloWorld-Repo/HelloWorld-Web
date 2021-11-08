import React, { useState } from "react";
import { useFormik } from "formik";
import { TextField, Button, FormControl, Box } from "@mui/material";
import { useTheme } from "@mui/styles";
import * as Yup from "yup";

import { useAuth } from "../../../../contexts/auth";
import useStyles from "./styles";

const LoginForm = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Ops, você esqueceu o seu e-mail")
        .email("E-mail inválido, verifique se há algo errado"),
      password: Yup.string()
        .required("Ops, você esqueceu a sua senha")
        .test(
          "len",
          "Sua senha contém pelo menos 6 dígitos",
          (val) => val?.length >= 6
        ),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { email, password } = values;
        await signIn(email, password);
      } catch (error) {
        console.error(error);
        setError(error?.message || "Ops, aconteceu um erro, tente novamente");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form className={classes.form}>
      <FormControl fullWidth sx={{ p: theme.spacing(1, 0) }}>
        <TextField
          color="secondary"
          label="E-mail"
          variant="filled"
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          helperText={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""
          }
          error={formik.errors.email && formik.touched.email}
          classes={{ root: classes.input }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ p: theme.spacing(1, 0) }}>
        <TextField
          color="secondary"
          label="Senha"
          variant="filled"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          helperText={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ""
          }
          error={formik.errors.password && formik.touched.password}
          classes={{ root: classes.input }}
        />
      </FormControl>

      <Box className={classes.buttonContainer}>
        <Button
          disabled={
            formik.isSubmitting ||
            !!formik.errors.email ||
            !!formik.errors.password
          }
          variant="contained"
          size="large"
          color="tertiary"
          fullWidth
          onClick={formik.handleSubmit}
        >
          Entrar
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
