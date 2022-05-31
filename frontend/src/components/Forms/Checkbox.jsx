// Material-UI components
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';

import { CheckboxWithLabel } from 'formik-material-ui';

import { Field } from 'formik';

import { useFormikContext } from 'formik';

const CheckboxWrapper = ({
  name,
  label,
  legend,
  handleInputChange,
  checkBoxOptions,
  ...rest
}) => {
  const { values, handleChange } = useFormikContext();
  return (
    <FormControl
      sx={{ display: 'flex', alignSelf: 'flex-start' }}
      component="fieldset"
    >
      <FormLabel component="legend">{name}</FormLabel>
      <FormGroup>
        {checkBoxOptions.map((opt) => (
          <Field
            checked={values[name].includes(opt.value)}
            type="checkbox"
            name={opt.name}
            component={CheckboxWithLabel}
            key={opt.id}
            value={opt.value}
            onChange={handleChange}
            Label={{ label: opt.label }}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
