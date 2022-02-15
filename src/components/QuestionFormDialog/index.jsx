import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

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
import { getChapters } from "../../services/StoryService";
import { useFormik } from "formik";
import * as yup from "yup";
import DynamicsQuestionRow from "./components/DynamicsQuestionRow";

const QuestionFormDialog = ({
  open = false,
  onClose,
  onSubmit,
  question,
  chapterId,
  title,
  submitText,
}) => {
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(question?.options || []);

  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      description: question?.description || "",
      type: question?.type || "",
      chapterId: "",
    },
    validationSchema: yup.object({
      description: yup.string().required("Digite o texto da questão"),
      chapterId: yup
        .string()
        .required("Selecione o capítulo a que essa questão pertence"),
      type: yup.number().required("Escolha o tipo de questão"),
    }),
    onSubmit: (values) => {
      if (!!onSubmit) {
        formik.resetForm();
        onSubmit({ ...values, options });
      }
    },
  });

  const loadModules = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getChapters();
      setChapters(response);

      formik.setFieldValue(
        "chapterId",
        question?.chapterId || chapterId || "",
        true
      );
    } catch (error) {
      setError(`Não foi possível recuperar os capítulos: ${error?.message}`);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterId, question?.chapterId]);

  useEffect(() => {
    const loadData = async () => {
      await loadModules();
    };

    loadData();
  }, [loadModules]);

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
          multiline
          margin="dense"
          type="text"
          name="description"
          label="Texto"
          error={!!formik.touched.description && !!formik.errors.description}
          helperText={
            !!formik.touched.description && !!formik.errors.description
              ? formik.errors.description
              : ""
          }
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          inputProps={{ style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
        <FormControl
          fullWidth
          error={!!formik.errors?.chapterId && formik.touched?.chapterId}
          margin="dense"
        >
          <InputLabel id="chapters-label-id">
            <Typography fontSize={18}>Capítulo</Typography>
          </InputLabel>
          <Select
            labelId="chapters-label-id"
            id="chapters-input-id"
            value={formik.values.chapterId}
            label="Capítulo"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="chapterId"
            margin="dense"
            disabled={!!question && !!question?.chapterId}
          >
            <MenuItem value={""}>
              <Typography fontSize={18}>{`Selecione o capítulo`}</Typography>
            </MenuItem>
            {chapters?.map((chapter) => (
              <MenuItem value={chapter.id} key={chapter.id}>
                <Typography
                  fontSize={18}
                >{`${chapter.position} - ${chapter.title}`}</Typography>
              </MenuItem>
            ))}
          </Select>
          {!!formik.errors?.chapterId && formik.touched?.chapterId && (
            <FormHelperText>{formik.errors?.chapterId}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          error={!!formik.errors?.type && formik.touched?.type}
          margin="dense"
        >
          <InputLabel id="types-label-id">
            <Typography fontSize={18}>Tipo de Questão</Typography>
          </InputLabel>
          <Select
            labelId="types-label-id"
            id="types-input-id"
            value={formik.values.type}
            label="Tipo de Questão"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="type"
          >
            <MenuItem value={""}>
              <Typography fontSize={18}>Selecione o tipo</Typography>
            </MenuItem>
            <MenuItem value="1">
              <Typography fontSize={18}>1 - Múltipla Escolha</Typography>
            </MenuItem>
            <MenuItem value="2">
              <Typography fontSize={18}>2 - Questão de Lacunas</Typography>
            </MenuItem>
          </Select>
          {!!formik.errors?.type && formik.touched?.type && (
            <FormHelperText>{formik.errors?.type}</FormHelperText>
          )}
        </FormControl>
        <DynamicsQuestionRow
          options={options}
          onChangeOptions={setOptions}
          questionId={question?.id}
        />
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

QuestionFormDialog.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    chapterId: PropTypes.number.isRequired,
    options: PropTypes.arrayOf({
      text: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isRight: PropTypes.bool.isRequired,
    }),
  }),
  chapterId: PropTypes.number,
  title: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
};

export default QuestionFormDialog;
