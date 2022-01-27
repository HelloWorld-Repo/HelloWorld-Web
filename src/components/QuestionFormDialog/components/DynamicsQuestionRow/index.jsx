import React from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  TextField,
  IconButton,
  FormControlLabel,
  FormGroup,
  Typography,
  Checkbox,
  useTheme,
} from "@mui/material";
import useStyles from "./styles";

const DynamicsQuestionRow = ({ onChangeOptions, options = [], questionId }) => {
  const classes = useStyles();

  const theme = useTheme();

  const handleRemove = (index) => {
    let tempArray = [...options];
    tempArray.splice(index, 1);
    onChangeOptions(tempArray);
  };

  const formik = useFormik({
    initialValues: {
      text: "",
      isRight: false,
    },
    validationSchema: yup.object({
      text: yup.string().required("Digite o texto da resposta"),
      isRight: yup.boolean().required(),
    }),
    onSubmit: (values) => {
      onChangeOptions([...options, { ...values, questionId }]);
      formik.resetForm();
    },
  });

  return (
    <>
      <Typography variant="h2" margin={theme.spacing(2, 0)}>
        Opções de Resposta
      </Typography>
      <Box className={classes.optionsContainer}>
        {options?.map((option, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            className={classes.rowContainer}
            alignItems="center"
          >
            <Typography fontSize={16}>{option.text}</Typography>
            <Typography fontSize={16}>
              {option.isRight ? "Sim" : "Não"}
            </Typography>
            <IconButton size="small" onClick={() => handleRemove(index)}>
              <CloseIcon fontSize="12" color="red" />
            </IconButton>
          </Box>
        ))}
        <Box
          component="form"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop={theme.spacing(3)}
        >
          <TextField
            multiline
            variant="outlined"
            size="small"
            type="text"
            name="text"
            label="Texto da opção"
            fullWidth
            error={!!formik.touched.text && !!formik.errors.text}
            helperText={
              !!formik.touched.text && !!formik.errors.text ? (
                <Typography fontSize={14}>{formik.errors.text}</Typography>
              ) : (
                ""
              )
            }
            value={formik.values.text}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            inputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
          />
          <FormGroup className={classes.checkbox}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!formik.values.isRight}
                  onChange={() =>
                    formik.setFieldValue(
                      "isRight",
                      !formik.values.isRight,
                      true
                    )
                  }
                />
              }
              label={<Typography fontSize={14}>Opção correta</Typography>}
            />
          </FormGroup>
          <Box>
            <IconButton
              size="small"
              disabled={!formik.isValid || !formik.dirty}
              onClick={formik.handleSubmit}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

DynamicsQuestionRow.propTypes = {
  onChangeOptions: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.number,
    })
  ),
  questionId: PropTypes.number,
};

export default DynamicsQuestionRow;
