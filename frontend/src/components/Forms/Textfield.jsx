import { useField, ErrorMessage } from 'formik';

// Material-UI components
import TextField from '@mui/material/TextField';

const TextfieldWrapper = ({ name, ...rest }) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...rest,
    fullWidth: true,
    variand: 'outlined',
    margin: 'normal',
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default TextfieldWrapper;
