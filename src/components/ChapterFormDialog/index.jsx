import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MDEditor from "@uiw/react-md-editor";

import {
  Dialog,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import { getModules } from "../../services/StoryService";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";

const ChapterFormDialog = ({
  open = false,
  onClose,
  onSubmit,
  chapter,
  moduleId,
  title,
  submitText,
}) => {
  const [modules, setModules] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const loadModules = async () => {
    try {
      setLoading(true);
      const response = await getModules();
      setModules(response);

      formik.setFieldValue(
        "moduleId",
        chapter?.moduleId || moduleId || "",
        true
      );
    } catch (error) {
      setError(`Não foi possível recuperar os módulos: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadModules();
    };

    loadData();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: chapter?.title || "",
      explanation: chapter?.explanation || "",
      position: chapter?.position || "",
      moduleId: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Digite o título do capítulo"),
      explanation: yup.string().required("Digite a explicação do capítulo"),
      moduleId: yup.string().required("Selecione o módulo desse capítulo"),
      position: yup
        .number()
        .min(0, "Digite um número positivo")
        .required("Digite a posição do capítulo dentro do módulo"),
    }),
    onSubmit: (values) => {
      console.log(values);
      if (!!onSubmit) {
        onSubmit(values);
        formik.resetForm();
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        variant="h1"
        fontSize={30}
        textAlign="center"
        color={theme.palette.secondary.contrastText}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
        <TextField
          fullWidth
          margin="dense"
          type="text"
          name="title"
          label="Título"
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
        <FormControl
          fullWidth
          error={!!formik.errors?.moduleId && formik.touched?.moduleId}
        >
          <InputLabel id="modules-label-id">
            <Typography fontSize={18}>Módulo</Typography>
          </InputLabel>
          <Select
            labelId="modules-label-id"
            id="modules-input-id"
            value={formik.values.moduleId}
            label="Módulo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="moduleId"
          >
            <MenuItem value={""}>
              <Typography fontSize={18}>{`Selecione o módulo`}</Typography>
            </MenuItem>
            {modules?.map((module) => (
              <MenuItem value={module.id} key={module.id}>
                <Typography
                  fontSize={18}
                >{`${module.position} - ${module.title}`}</Typography>
              </MenuItem>
            ))}
          </Select>
          {!!formik.errors?.moduleId && formik.touched?.moduleId && (
            <FormHelperText>{formik.errors?.moduleId}</FormHelperText>
          )}
        </FormControl>
        <TextField
          fullWidth
          margin="dense"
          type="number"
          name="position"
          label="Posição"
          error={!!formik.touched.position && !!formik.errors.position}
          helperText={
            !!formik.touched.position && !!formik.errors.position
              ? formik.errors.position
              : ""
          }
          value={formik.values.position}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          inputProps={{ style: { fontSize: 18 }, min: 0 }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
        <Box>
          <Typography fontSize={18} margin={theme.spacing(2, 0, 1, 0)}>
            Explicação do capítulo:
          </Typography>
          <MDEditor
            value={formik.values.explanation}
            onChange={(value) =>
              formik.setFieldValue("explanation", value, true)
            }
          />
          {!!formik.errors?.explanation && (
            <FormHelperText>{formik.errors?.explanation}</FormHelperText>
          )}
        </Box>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(undefined)}
        >
          <Alert onClose={() => setError(undefined)} severity="error">
            {error}
          </Alert>
        </Snackbar>
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

ChapterFormDialog.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  chapter: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    explanation: PropTypes.string.isRequired,
    moduleId: PropTypes.number.isRequired,
  }),
  moduleId: PropTypes.number,
  title: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default ChapterFormDialog;
