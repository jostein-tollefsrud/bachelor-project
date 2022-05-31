// Material-UI components
import TextField from '@mui/material/TextField';

import { useField } from 'formik';

const DateTimePicker = ({ name, ...rest }) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...rest,
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} />;
};

export default DateTimePicker;
