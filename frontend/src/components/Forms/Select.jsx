// Material-UI components
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { useField, useFormikContext } from 'formik';

const SelectWrapper = ({ name, options, ...rest }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...rest,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => (
        <MenuItem key={pos} value={item}>
          {options[item]}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectWrapper;
